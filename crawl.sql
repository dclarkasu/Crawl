-- MySQL Workbench Forward Engineering
DROP DATABASE IF EXISTS `crawldb`;
CREATE DATABASE `crawldb`;
USE `crawldb`;
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema crawldb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `contact`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `contact` ;

CREATE TABLE IF NOT EXISTS `contact` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `phone_number` VARCHAR(45) NULL,
  `email` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `contact_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_user_contact_idx` (`contact_id` ASC),
  CONSTRAINT `fk_user_contact`
    FOREIGN KEY (`contact_id`)
    REFERENCES `contact` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `login` ;

CREATE TABLE IF NOT EXISTS `login` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `user_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC),
  INDEX `fk_login_user_idx` (`user_id` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  CONSTRAINT `fk_login_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `long` DECIMAL(10,4) NULL,
  `lat` DECIMAL(10,4) NULL,
  `street` VARCHAR(255) NULL,
  `street2` VARCHAR(255) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(2) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `venue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `venue` ;

CREATE TABLE IF NOT EXISTS `venue` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NULL,
  `hours` VARCHAR(45) NULL,
  `rating_id` INT UNSIGNED NULL,
  `address_id` INT UNSIGNED NOT NULL,
  `contact_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_venue_contact_idx` (`contact_id` ASC),
  INDEX `fk_venue_address_idx` (`address_id` ASC),
  CONSTRAINT `fk_venue_contact`
    FOREIGN KEY (`contact_id`)
    REFERENCES `contact` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_venue_address`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `group` ;

CREATE TABLE IF NOT EXISTS `group` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `admin_id` INT UNSIGNED NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_group_user_idx` (`admin_id` ASC),
  CONSTRAINT `fk_group_user`
    FOREIGN KEY (`admin_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `routes`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `routes` ;

CREATE TABLE IF NOT EXISTS `routes` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event` ;

CREATE TABLE IF NOT EXISTS `event` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL,
  `route_id` INT UNSIGNED NULL,
  `group_id` INT UNSIGNED NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_event_route_idx` (`route_id` ASC),
  INDEX `fk_event_group_idx` (`group_id` ASC),
  CONSTRAINT `fk_event_route`
    FOREIGN KEY (`route_id`)
    REFERENCES `routes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_group`
    FOREIGN KEY (`group_id`)
    REFERENCES `group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `user_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_group` ;

CREATE TABLE IF NOT EXISTS `user_group` (
  `user_id` INT UNSIGNED NOT NULL,
  `group_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `group_id`),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  UNIQUE INDEX `group_id_UNIQUE` (`group_id` ASC),
  CONSTRAINT `fk_user_group_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_group_group`
    FOREIGN KEY (`group_id`)
    REFERENCES `group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `route_venue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `route_venue` ;

CREATE TABLE IF NOT EXISTS `route_venue` (
  `route_id` INT UNSIGNED NOT NULL,
  `venue_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`route_id`, `venue_id`),
  UNIQUE INDEX `route_id_UNIQUE` (`route_id` ASC),
  UNIQUE INDEX `venue_id_UNIQUE` (`venue_id` ASC),
  CONSTRAINT `fk_route_venue_venue`
    FOREIGN KEY (`venue_id`)
    REFERENCES `venue` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_route_venue_rout`
    FOREIGN KEY (`route_id`)
    REFERENCES `routes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
GRANT USAGE ON *.* TO crawluser@localhost;
 DROP USER crawluser@localhost;
SET SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';
CREATE USER 'crawluser'@'localhost' IDENTIFIED BY 'crawl';

GRANT SELECT, INSERT, TRIGGER ON TABLE * TO 'crawluser'@'localhost';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'crawluser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
