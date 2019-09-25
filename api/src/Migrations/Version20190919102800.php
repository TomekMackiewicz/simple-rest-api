<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20190919102800 extends AbstractMigration
{
    public function getDescription() : string
    {
        return '';
    }

    public function up(Schema $schema) : void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, age INT NOT NULL, location VARCHAR(255) NOT NULL, about LONGTEXT DEFAULT NULL, relationship_status VARCHAR(255) NOT NULL, sexual_orientation VARCHAR(255) NOT NULL, work VARCHAR(255) NOT NULL, education VARCHAR(255) NOT NULL, kids VARCHAR(255) NOT NULL, language VARCHAR(255) NOT NULL, secondary_languages VARCHAR(255) DEFAULT NULL, zodiac VARCHAR(255) DEFAULT NULL, personality LONGTEXT DEFAULT NULL, friends VARCHAR(255) DEFAULT NULL, animals VARCHAR(255) DEFAULT NULL, favourite_dish VARCHAR(255) DEFAULT NULL, favourite_cuisine VARCHAR(255) DEFAULT NULL, favourite_drink VARCHAR(255) DEFAULT NULL, favourite_music VARCHAR(255) DEFAULT NULL, hobby LONGTEXT DEFAULT NULL, favourite_sport VARCHAR(255) DEFAULT NULL, favourite_book VARCHAR(255) DEFAULT NULL, favourite_movie VARCHAR(255) DEFAULT NULL, favourite_tv_show VARCHAR(255) DEFAULT NULL, favourite_colour VARCHAR(255) DEFAULT NULL, ethnicity VARCHAR(255) DEFAULT NULL, shape VARCHAR(255) DEFAULT NULL, height VARCHAR(255) DEFAULT NULL, eye_colour VARCHAR(255) DEFAULT NULL, tattoos VARCHAR(255) DEFAULT NULL, dressing_style VARCHAR(255) DEFAULT NULL, favourite_aspect VARCHAR(255) DEFAULT NULL, general_look VARCHAR(255) DEFAULT NULL, habitat VARCHAR(255) DEFAULT NULL, cotenants VARCHAR(255) DEFAULT NULL, income VARCHAR(255) DEFAULT NULL, car VARCHAR(255) DEFAULT NULL, smoking VARCHAR(255) DEFAULT NULL, drinking VARCHAR(255) DEFAULT NULL, sport VARCHAR(255) DEFAULT NULL, traveling VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE = InnoDB');
    }

    public function down(Schema $schema) : void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->abortIf($this->connection->getDatabasePlatform()->getName() !== 'mysql', 'Migration can only be executed safely on \'mysql\'.');

        $this->addSql('DROP TABLE user');
    }
}
