<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250727103729 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SEQUENCE editions_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE homebrew_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE jinxes_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE roles_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE SEQUENCE teams_id_seq INCREMENT BY 1 MINVALUE 1 START 1');
        $this->addSql('CREATE TABLE editions (id INT NOT NULL, identifier VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX editions_identifier_idx ON editions (identifier)');
        $this->addSql('CREATE TABLE ext_translations (id SERIAL NOT NULL, locale VARCHAR(8) NOT NULL, object_class VARCHAR(191) NOT NULL, field VARCHAR(32) NOT NULL, foreign_key VARCHAR(64) NOT NULL, content TEXT DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX translations_lookup_idx ON ext_translations (locale, object_class, foreign_key)');
        $this->addSql('CREATE INDEX general_translations_lookup_idx ON ext_translations (object_class, foreign_key)');
        $this->addSql('CREATE UNIQUE INDEX lookup_unique_idx ON ext_translations (locale, object_class, field, foreign_key)');
        $this->addSql('CREATE TABLE homebrew (id INT NOT NULL, uuid VARCHAR(255) NOT NULL, created TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, accessed TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, json JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX uuid_idx ON homebrew (uuid)');
        $this->addSql('CREATE TABLE jinxes (id INT NOT NULL, target_id INT DEFAULT NULL, trick_id INT DEFAULT NULL, reason TEXT DEFAULT \'\' NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_DC129E1F158E0B66 ON jinxes (target_id)');
        $this->addSql('CREATE INDEX IDX_DC129E1FB281BE2E ON jinxes (trick_id)');
        $this->addSql('CREATE TABLE roles (id INT NOT NULL, edition_id INT DEFAULT NULL, team_id INT DEFAULT NULL, identifier VARCHAR(255) NOT NULL, name VARCHAR(255) DEFAULT \'\' NOT NULL, first_night INT DEFAULT 0 NOT NULL, first_night_reminder TEXT DEFAULT \'\' NOT NULL, other_night INT DEFAULT 0 NOT NULL, other_night_reminder TEXT DEFAULT \'\' NOT NULL, reminders TEXT NOT NULL, reminders_global TEXT NOT NULL, setup BOOLEAN DEFAULT false NOT NULL, ability TEXT DEFAULT \'\' NOT NULL, image VARCHAR(255) DEFAULT \'\' NOT NULL, special JSON NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_B63E2EC774281A5E ON roles (edition_id)');
        $this->addSql('CREATE INDEX IDX_B63E2EC7296CD8AE ON roles (team_id)');
        $this->addSql('CREATE INDEX roles_identifier_idx ON roles (identifier)');
        $this->addSql('COMMENT ON COLUMN roles.reminders IS \'(DC2Type:array)\'');
        $this->addSql('COMMENT ON COLUMN roles.reminders_global IS \'(DC2Type:array)\'');
        $this->addSql('CREATE TABLE teams (id INT NOT NULL, identifier VARCHAR(255) NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX teams_identifier_idx ON teams (identifier)');
        $this->addSql('CREATE TABLE messenger_messages (id BIGSERIAL NOT NULL, body TEXT NOT NULL, headers TEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, available_at TIMESTAMP(0) WITHOUT TIME ZONE NOT NULL, delivered_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_75EA56E0FB7336F0 ON messenger_messages (queue_name)');
        $this->addSql('CREATE INDEX IDX_75EA56E0E3BD61CE ON messenger_messages (available_at)');
        $this->addSql('CREATE INDEX IDX_75EA56E016BA31DB ON messenger_messages (delivered_at)');
        $this->addSql('CREATE OR REPLACE FUNCTION notify_messenger_messages() RETURNS TRIGGER AS $$
            BEGIN
                PERFORM pg_notify(\'messenger_messages\', NEW.queue_name::text);
                RETURN NEW;
            END;
        $$ LANGUAGE plpgsql;');
        $this->addSql('DROP TRIGGER IF EXISTS notify_trigger ON messenger_messages;');
        $this->addSql('CREATE TRIGGER notify_trigger AFTER INSERT OR UPDATE ON messenger_messages FOR EACH ROW EXECUTE PROCEDURE notify_messenger_messages();');
        $this->addSql('ALTER TABLE jinxes ADD CONSTRAINT FK_DC129E1F158E0B66 FOREIGN KEY (target_id) REFERENCES roles (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE jinxes ADD CONSTRAINT FK_DC129E1FB281BE2E FOREIGN KEY (trick_id) REFERENCES roles (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE roles ADD CONSTRAINT FK_B63E2EC774281A5E FOREIGN KEY (edition_id) REFERENCES editions (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
        $this->addSql('ALTER TABLE roles ADD CONSTRAINT FK_B63E2EC7296CD8AE FOREIGN KEY (team_id) REFERENCES teams (id) NOT DEFERRABLE INITIALLY IMMEDIATE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE SCHEMA public');
        $this->addSql('DROP SEQUENCE editions_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE homebrew_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE jinxes_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE roles_id_seq CASCADE');
        $this->addSql('DROP SEQUENCE teams_id_seq CASCADE');
        $this->addSql('ALTER TABLE jinxes DROP CONSTRAINT FK_DC129E1F158E0B66');
        $this->addSql('ALTER TABLE jinxes DROP CONSTRAINT FK_DC129E1FB281BE2E');
        $this->addSql('ALTER TABLE roles DROP CONSTRAINT FK_B63E2EC774281A5E');
        $this->addSql('ALTER TABLE roles DROP CONSTRAINT FK_B63E2EC7296CD8AE');
        $this->addSql('DROP TABLE editions');
        $this->addSql('DROP TABLE ext_translations');
        $this->addSql('DROP TABLE homebrew');
        $this->addSql('DROP TABLE jinxes');
        $this->addSql('DROP TABLE roles');
        $this->addSql('DROP TABLE teams');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
