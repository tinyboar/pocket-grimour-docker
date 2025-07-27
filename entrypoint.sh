#!/bin/sh
set -e

# Очистка и прогрев кэша
php bin/console cache:clear --no-warmup --no-interaction
php bin/console cache:warmup --no-interaction

# Миграции и импорт
php bin/console doctrine:migrations:migrate --no-interaction
php bin/console pocket-grimoire:import --type=teams,editions,characters,jinxes --locale=en_GB --new=yes

exec php-fpm
