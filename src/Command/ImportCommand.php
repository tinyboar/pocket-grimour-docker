<?php

namespace App\Command;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use Doctrine\ORM\EntityManagerInterface;
use App\Entity\Team;
use App\Repository\TeamRepository;
use App\Entity\Role;
use App\Repository\RoleRepository;
use App\Entity\Edition;
use App\Repository\EditionRepository;
use App\Entity\Jinx;
use App\Repository\JinxRepository;
use App\Model\LocaleModel;

class ImportCommand extends Command
{

    protected static $defaultName = 'pocket-grimoire:import';

    private const DEFAULT_LOCALE = 'en_GB';

    // The order matters. Teams must be imported first, then characters, then jinxes.
    protected static $types = [
        'teams',
        'editions',
        'characters',
        'jinxes'
    ];

    private $io;
    private $em;
    private $teamRepo;
    private $roleRepo;
    private $editionRepo;
    private $cache = [];
    private $localeModel;

    public function __construct(
        EntityManagerInterface $em,
        TeamRepository $teamRepo,
        RoleRepository $roleRepo,
        EditionRepository $editionRepo,
        JinxRepository $jinxRepo,
        LocaleModel $localeModel
    ) {

        $this->em = $em;
        $this->teamRepo = $teamRepo;
        $this->roleRepo = $roleRepo;
        $this->editionRepo = $editionRepo;
        $this->jinxRepo = $jinxRepo;
        $this->cache = [
            'teams' => [],
            'roles' => [],
            'editions' => []
        ];
        $this->localeModel = $localeModel;

        parent::__construct();

    }

    protected function configure(): void
    {

        $this
            ->addOption(
                'new',
                null,
                InputOption::VALUE_OPTIONAL,
                'Add any new characters/jinxes?',
                'yes'
            )
            ->addOption(
                'type',
                't',
                InputOption::VALUE_OPTIONAL,
                'Which type to import?',
                'all'
            )
            ->addOption(
                'locale',
                'l',
                InputOption::VALUE_OPTIONAL,
                'Which locales to import? (comma-separated)',
                'all'
            )
            ;

    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {

        $this->io = new SymfonyStyle($input, $output);
        $addNew = in_array(strtolower($input->getOption('new')), ['yes', 'y', '1']);
        $types = $this->interpretOption($input->getOption('type'), self::$types);
        $locales = $this->interpretOption(
            $input->getOption('locale'),
            $this->localeModel->getLocaleCodes([self::DEFAULT_LOCALE])
        );
        $table = [];

        $labelSize = array_reduce($types, function ($carry, $type) {
            return max($carry, strlen($type) + 1);
        }, 0);

        if ($addNew) {
            $this->addNew($output->isVerbose());
        }

        foreach ($types as $type) {

            $bar = $this->io->createProgressBar(count($locales));
            $bar->start();
            $label = str_pad($type . ':', $labelSize);
            $bar->setFormat(" {$label} %current%/%max% [%bar%] %percent:3s%% %elapsed:6s%");

            foreach ($locales as $locale) {

                $imported = $this->import($type, $locale, $output->isVerbose());

                if (is_string($imported)) {
                    $this->io->warning($imported);
                }

                $table[] = [$type, $locale, $imported === true ? 'Success' : 'Error'];
                $bar->advance();

            }

            $bar->finish();
            $this->io->writeln('');

        }

        $this->io->table(['Type', 'Locale', 'Status'], $table);
        $this->io->success("Import successful for type '{$input->getOption('type')}' and locale(s) '{$input->getOption('locale')}'");

        return Command::SUCCESS;

    }

    protected function addNew(bool $output = false)
    {

        // Check all characters in `assets/data/characters.json` - update all data.

        $characters = $this->read('.', 'characters');

        $bar = $this->io->createProgressBar(count($characters));
        $bar->start();
        $bar->setFormat("Updating character data:  %current%/%max% [%bar%] %percent:3s%% %elapsed:6s%");

        foreach ($characters as $data) {

            $this->updateRole(
                $this->getRole($data, self::DEFAULT_LOCALE),
                $data,
                self::DEFAULT_LOCALE
            );
            $bar->advance();

        }

        $bar->finish();
        $this->io->writeln('');

        // Check all jinxes in `assets/data/jinx.json` - add any missing ones.

        $jinxes = $this->read('.', 'jinx');
        $missingJinxes = [];

        foreach ($jinxes as $target) {

            $targetRole = $this->roleRepo->findOneBy(['identifier' => $target['id']]);

            if (is_null($targetRole)) {
                $this->io->writeln("Jinx: unable to find target role '{$target['id']}'");
                continue;
            }

            foreach ($target['jinx'] as $trick) {

                $trickRole = $this->roleRepo->findOneBy(['identifier' => $trick['id']]);

                if (is_null($trickRole)) {
                    $this->io->writeln("Jinx: unable to find trick role '{$trick['id']}'");
                    continue;
                }

                $jinx = $this->jinxRepo->findOneBy([
                    'target' => $targetRole,
                    'trick' => $trickRole
                ]);

                if (is_null($jinx)) {

                    $missingJinxes[] = [
                        'target' => $targetRole,
                        'trick' => $trickRole,
                        'reason' => $trick['reason']
                    ];

                }

            }

        }

        $countMissingJinxes = count($missingJinxes);

        if ($countMissingJinxes > 0) {

            $listing = [];

            foreach ($missingJinxes as $missingJinx) {

                $jinx = new Jinx();
                $jinx
                    ->setTranslatableLocale(self::DEFAULT_LOCALE)
                    ->setTarget($missingJinx['target'])
                    ->setTrick($missingJinx['trick'])
                    ->setReason($missingJinx['reason']);
                $this->em->persist($jinx);

                $targetName = $missingJinx['target']->getName();
                $trickName = $missingJinx['trick']->getName();
                $listing[] = "Added jinx for '{$targetName}' and '{$trickName}'";

            }

            $this->em->flush();

            if ($output) {
                $this->io->listing($listing);
            }

            $this->io->writeln("Added {$countMissingJinxes} missing jinx(es)");

        }

        // Update the night order based on `assets/data/night-order.json`.

        $this->io->write('Updating the night order ... ');
        $nightOrder = $this->read('.', 'night-order');

        $firstNight = [];

        foreach ($nightOrder['firstNight'] as $firstNightName) {

            $character = $this->roleRepo->findOneBy(['identifier' => $firstNightName]);

            if (!is_null($character)) {

                $character->setFirstNight(
                    array_push($firstNight, $character->getName())
                );
                $this->em->persist($character);

            }

        }

        $otherNight = [];

        foreach ($nightOrder['otherNight'] as $otherNightName) {

            $character = $this->roleRepo->findOneBy(['identifier' => $otherNightName]);

            if (!is_null($character)) {

                $character->setOtherNight(
                    array_push($otherNight, $character->getName())
                );
                $this->em->persist($character);

            }

        }

        if (count($firstNight) && count($otherNight)) {

            if ($output) {

                $getIndex = function (string $name, int $index): string {
                    return "{$index}. {$name}";
                };

                $this->io->writeln('First night:');
                $this->io->listing(array_map($getIndex, $firstNight, array_keys($firstNight)));
                $this->io->writeln('Other nights:');
                $this->io->listing(array_map($getIndex, $otherNight, array_keys($otherNight)));

            }

            $this->io->write('Done!');
            $this->io->newLine();

        }

    }

    protected function import(string $type, string $locale, bool $output = false)
    {

        $return = true;

        switch ($type) {

            case 'teams':

                $return = $this->importTeams($locale, $output);
                break;
                
            case 'editions':               // 👈 новое
                $return = $this->importEditions($locale, $output);
                break;

            case 'characters':

                $return = $this->importCharacters($locale, $output);
                break;

            case 'jinxes':

                $return = $this->importJinxes($locale, $output);
                break;

            default:
                return "Unrecognised type '{$type}'";

        }

        return $return;

    }

    protected function importTeams(string $locale, bool $output)
    {

        $contents = $this->read('teams', $locale);

        if (is_string($contents)) {
            return $contents;
        }

        $listing = [];

        foreach ($contents as $rawTeam) {

            $team = $this->getTeam($rawTeam, $locale);
            $listing[] = "Team '{$team->getIdentifier()}' found/created for locale {$locale}";

            $team
                ->setTranslatableLocale($locale)
                ->setName($rawTeam['name']);
            $this->em->persist($team);
            $listing[] = "Team '{$team->getIdentifier()}' updated for locale {$locale}";

        }

        if (empty($listing)) {
            return 'No teams updated or created';
        }

        if ($output) {
            $this->io->listing($listing);
        }

        $this->em->flush();

        return true;

    }

        /**
     * Импортирует assets/data/editions/{locale}.json
     */
    protected function importEditions(string $locale, bool $output)
    {
        $contents = $this->read('editions', $locale);

        if (is_string($contents)) {
            // read() вернуло строку‑ошибку ─ пробрасываем её дальше
            return $contents;
        }

        $listing = [];

        foreach ($contents as $data) {

            // $data выглядит как ["id" => "trouble_brewing", "name" => "Trouble Brewing"]
            $edition = $this->getEdition($data['id'], $locale);

            $edition
                ->setTranslatableLocale($locale)
                ->setName($data['name']);

            $this->em->persist($edition);

            $listing[] = "Edition '{$edition->getIdentifier()}' updated for locale {$locale}";
        }

        if ($output && $listing) {
            $this->io->listing($listing);
        }

        $this->em->flush();

        return true;
    }

    protected function importCharacters(string $locale, bool $output)
    {

        $contents = $this->read('characters', $locale);

        if (is_string($contents)) {
            return $contents;
        }

        $listing = [];

        foreach ($contents as $data) {

            $role = $this->getRole($data, $locale);
            $listing[] = "Role '{$role->getIdentifier()}' found/created for locale {$locale}";

            $this->updateRole($role, $data, $locale);
            $this->em->persist($role);
            $listing[] = "Role '{$role->getIdentifier()}' updated for locale {$locale}";

        }

        if (empty($listing)) {
            return 'No roles updated or created';
        }

        if ($output) {
            $this->io->listing($listing);
        }

        $this->em->flush();

        return true;

    }

    protected function importJinxes(string $locale, bool $output)
    {

        $contents = $this->read('jinxes', $locale);

        if (is_string($contents)) {
            return $contents;
        }

        // Hack to pretend that the default Jinx file looks like the data for
        // the other locales.
        if (is_array($contents) && $locale === self::DEFAULT_LOCALE) {
            $contents = $this->convertJinxes($contents);
        }

        $listing = [];

        foreach ($contents as $data) {

            $target = $data['target'];
            $trick = $data['trick'];

            if (!($jinx = $this->jinxRepo->getByTargetTrick($target, $trick))) {

                $listing[] = "WARNING: Unable to find a Jinx for '{$target}' and '{$trick}'";
                continue;

            }

            $jinx
                ->setTranslatableLocale($locale)
                ->setReason($data['reason']);
            $this->em->persist($jinx);
            $listing[] = "Jinx reason for '{$target}' and '{$trick}' updated for locale {$locale}";

        }

        if ($output) {
            $this->io->listing($listing);
        }

        $this->em->flush();

        return true;

    }

    private function interpretOption(string $option, array $all): array
    {
        return $option === 'all' ? $all : array_map('trim', explode(',', $option));
    }

    private function getFileName(string $type, string $locale): string
    {

        $path = "/../../assets/data/{$type}/{$locale}.json";

        // Hack to pretend that the default locale (en_GB) is actually a
        // language, allowing us to update it.
        if ($locale === self::DEFAULT_LOCALE) {

            if ($type === 'jinxes') {
                $type = 'jinx';
            }

            $path = "/../../assets/data/{$type}.json";
        }

        return realpath(dirname(__FILE__) . $path);

    }

    private function getFileContents(string $file): array
    {
        return json_decode(file_get_contents($file), true);
    }

    private function convertJinxes(array $rawJinxes): array
    {

        $jinx = [];

        foreach ($rawJinxes as $data) {

            $target = $data['id'];

            foreach ($data['jinx'] as $jinxData) {
                $jinx[] = [
                    'target' => $target,
                    'trick' => $jinxData['id'],
                    'reason' => $jinxData['reason']
                ];
            }

        }

        return $jinx;

    }

    private function read(string $type, string $locale)
    {

        $file = $this->getFileName($type, $locale);
        $contents = $this->getFileContents($file);

        if (is_null($contents)) {
            return "Unable to read file at location '{$file}'";
        }

        return $contents;

    }

/**
 * Возвращает Team по identifier.
 * Если команды нет — создаёт черновик (name = id, с прописной буквы),
 * чтобы импорт не падал.
 */
private function getTeam(array $data, string $locale): Team
{
    $id   = $data['id'];                    // обязательно
    $name = $data['name'] ?? ucfirst($id);  // может отсутствовать

    // уже есть в кэше?
    if (isset($this->cache['teams'][$id])) {
        return $this->cache['teams'][$id];
    }

    // пробуем взять из БД
    $team = $this->teamRepo->findOneBy(['identifier' => $id]);

    // если нет ─ создаём заготовку
    if ($team === null) {
        $team = (new Team())
            ->setIdentifier($id)
            ->setTranslatableLocale($locale)
            ->setName($name);

        $this->em->persist($team);
    }

    return $this->cache['teams'][$id] = $team;
}

    
    /**
     * Возвращает Edition по identifier.
     * Если издание не найдено — создаёт «заготовку», чтобы импорт не падал.
     */
    private function getEdition(string $identifier, string $locale = self::DEFAULT_LOCALE): Edition
    {
        // уже есть в кэше ─ сразу отдаём
        if (isset($this->cache['editions'][$identifier])) {
            return $this->cache['editions'][$identifier];
        }

        // пробуем взять из БД
        $edition = $this->editionRepo->findOneBy(['identifier' => $identifier]);

        // не нашли ─ создаём черновик
        if ($edition === null) {
            $edition = (new Edition())
                ->setIdentifier($identifier)
                ->setTranslatableLocale($locale)
                ->setName(
                    ucwords(str_replace('_', ' ', $identifier)) // «Trouble Brewing» из «trouble_brewing»
                );

            $this->em->persist($edition);
        }

        // кладём в кэш и возвращаем
        return $this->cache['editions'][$identifier] = $edition;
    }


    private function getRole(array $data, string $locale): Role
    {

        $identifier = $data['id'];

        if (!array_key_exists($identifier, $this->cache['roles'])) {

            $role = $this->roleRepo->findOneBy(['identifier' => $identifier]);

            if (is_null($role)) {

                $role = $this->createRole($data, $locale);
                $this->em->persist($role);

            }

            $this->cache['roles'][$identifier] = $role;

        }

        return $this->cache['roles'][$identifier];

    }

    private function createRole(array $data, string $locale): Role
    {

        $role = new Role();
        $role->setIdentifier($data['id']);

        return $this->updateRole($role, $data, $locale);

    }

    private function updateRole(Role $role, array $data, string $locale): Role
    {

        $role
            ->setTranslatableLocale($locale)
            ->setName($data['name'])
            ->setAbility($data['ability']);

        if (array_key_exists('setup', $data)) {
            $role->setSetup($data['setup']);
        }

        if (array_key_exists('image', $data)) {
            $role->setImage($data['image']);
        }

        if (
            array_key_exists('firstNight', $data)
            && $data['firstNight'] > 0
        ) {
            $role->setFirstNight($data['firstNight']);
        }

        if (array_key_exists('firstNightReminder', $data)) {
            $role->setFirstNightReminder($data['firstNightReminder']);
        }

        if (
            array_key_exists('otherNight', $data)
            && $data['otherNight'] > 0
        ) {
            $role->setOtherNight($data['otherNight']);
        }

        if (array_key_exists('otherNightReminder', $data)) {
            $role->setOtherNightReminder($data['otherNightReminder']);
        }

        if (
            array_key_exists('reminders', $data)
            && count($data['reminders'])
        ) {
            $role->setReminders($data['reminders']);
        }

        if (
            array_key_exists('remindersGlobal', $data)
            && count($data['remindersGlobal'])
        ) {
            $role->setRemindersGlobal($data['remindersGlobal']);
        }

        if (!empty($data['team'])) {
            $role->setTeam($this->getTeam(['id' => $data['team']], $locale));
        }

        if (isset($data['special']) && !empty($data['special'])) {
            $role->setSpecial($data['special']);
        }

        if (
            array_key_exists('edition', $data)
            && !empty($data['edition'])
        ) {
            $role->setEdition($this->getEdition($data['edition']));
        }

        return $role;

    }

}
