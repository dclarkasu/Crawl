-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema crawldb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `crawldb` ;

-- -----------------------------------------------------
-- Schema crawldb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `crawldb` DEFAULT CHARACTER SET utf8 ;
USE `crawldb` ;

-- -----------------------------------------------------
-- Table `address`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `address` ;

CREATE TABLE IF NOT EXISTS `address` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `longitude` DECIMAL(10,4) NULL DEFAULT NULL,
  `lat` DECIMAL(10,4) NULL DEFAULT NULL,
  `street` VARCHAR(255) NULL DEFAULT NULL,
  `street2` VARCHAR(255) NULL DEFAULT NULL,
  `city` VARCHAR(45) NULL DEFAULT NULL,
  `state` VARCHAR(2) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `contact`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `contact` ;

CREATE TABLE IF NOT EXISTS `contact` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `phone_number` VARCHAR(45) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user` ;

CREATE TABLE IF NOT EXISTS `user` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `first_name` VARCHAR(45) NULL,
  `last_name` VARCHAR(45) NULL,
  `imgUrl` VARCHAR(255) NULL,
  `contact_id` INT(10) UNSIGNED NULL DEFAULT NULL UNIQUE,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_user_contact_idx` (`contact_id` ASC),
  CONSTRAINT `fk_user_contact`
    FOREIGN KEY (`contact_id`)
    REFERENCES `contact` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `crawl_group` ;

CREATE TABLE IF NOT EXISTS `crawl_group` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `admin_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  INDEX `fk_group_user_idx` (`admin_id` ASC),
  CONSTRAINT `fk_group_user`
    FOREIGN KEY (`admin_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `route`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `route` ;

CREATE TABLE IF NOT EXISTS `route` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `event`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `event` ;

CREATE TABLE IF NOT EXISTS `event` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `route_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `group_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_event_group`
    FOREIGN KEY (`group_id`)
    REFERENCES `crawl_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_route`
    FOREIGN KEY (`route_id`)
    REFERENCES `route` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `login`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `login` ;

CREATE TABLE IF NOT EXISTS `login` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_name` VARCHAR(45) NOT NULL,
  `password` VARCHAR(255) NOT NULL,
  `user_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC),
  UNIQUE INDEX `user_id_UNIQUE` (`user_id` ASC),
  INDEX `fk_login_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_login_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `venue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `venue` ;

CREATE TABLE IF NOT EXISTS `venue` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(500) NULL DEFAULT NULL,
  `hours` VARCHAR(45) NULL DEFAULT NULL,
  `imgUrl` VARCHAR(255) NULL,
  `rating_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  `address_id` INT(10) UNSIGNED NULL DEFAULT NULL UNIQUE,
  `contact_id` INT(10) UNSIGNED NULL DEFAULT NULL UNIQUE,
  `is_active` TINYINT(1) UNSIGNED DEFAULT 1,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_venue_address`
    FOREIGN KEY (`address_id`)
    REFERENCES `address` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_venue_contact`
    FOREIGN KEY (`contact_id`)
    REFERENCES `contact` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `route_venue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `route_venue` ;

CREATE TABLE IF NOT EXISTS `route_venue` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `route_id` INT(10) UNSIGNED NOT NULL,
  `venue_id` INT(10) UNSIGNED NOT NULL,
  `spot` INT(10) UNSIGNED,
  PRIMARY KEY (`id`, `venue_id`),
  CONSTRAINT `fk_route_venue_rout`
    FOREIGN KEY (`route_id`)
    REFERENCES `route` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_route_venue_venue`
    FOREIGN KEY (`venue_id`)
    REFERENCES `venue` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `user_group`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `user_group` ;

CREATE TABLE IF NOT EXISTS `user_group` (
  `user_id` INT(10) UNSIGNED NOT NULL,
  `group_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`user_id`, `group_id`),
  CONSTRAINT `fk_user_group_group`
    FOREIGN KEY (`group_id`)
    REFERENCES `crawl_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_group_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `post`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `post` ;

CREATE TABLE IF NOT EXISTS `post` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `group_id` INT UNSIGNED NOT NULL,
  `user_id` INT UNSIGNED NOT NULL,
  `message` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_post_user_idx` (`user_id` ASC),
  INDEX `fk_post_group_idx` (`group_id` ASC),
  CONSTRAINT `fk_post_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_group`
    FOREIGN KEY (`group_id`)
    REFERENCES `crawl_group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

INSERT INTO contact (phone_number, email) VALUES ('555-555-5555', 'bill@gmail.com');
INSERT INTO contact (phone_number, email) VALUES ('555-555-5556', 'lisa@gmail.com');
INSERT INTO contact (phone_number, email) VALUES ('555-555-5557', 'david@gmail.com');
INSERT INTO contact (phone_number, email) VALUES ('555-555-5558', 'pam@gmail.com');

INSERT INTO contact (phone_number, email) VALUES ('555-555-5559', 'sputnik@gmail.com');
INSERT INTO contact (phone_number, email) VALUES ('555-555-5510', 'true@gmail.com');
INSERT INTO contact (phone_number, email) VALUES ('555-555-5511', 'skylark@gmail.com');
INSERT INTO contact (phone_number, email) VALUES ('555-555-5512', 'mcman@gmail.com');

INSERT INTO user (first_name,last_name,contact_id) VALUES ('bill','james',1);
INSERT INTO user (first_name,last_name,contact_id) VALUES ('lisa','burns',2);
INSERT INTO user (first_name,last_name,contact_id) VALUES ('david','brown',3);
INSERT INTO user (first_name,last_name,contact_id) VALUES ('pam','grey',4);

INSERT INTO crawl_group (name, admin_id) VALUES ('pub day',3);

INSERT INTO user_group (user_id, group_id) VALUES (1,1);
INSERT INTO user_group (user_id, group_id) VALUES (2,1);
INSERT INTO user_group (user_id, group_id) VALUES (3,1);
INSERT INTO user_group (user_id, group_id) VALUES (4,1);

INSERT INTO login (user_name,password,user_id) VALUES ('cage','pass1',1);
INSERT INTO login (user_name,password,user_id) VALUES ('funngirl','pass2',2);
INSERT INTO login (user_name,password,user_id) VALUES ('dudeman','pass3',3);
INSERT INTO login (user_name,password,user_id) VALUES ('red','pass4',4);

INSERT INTO post (group_id,user_id,message) VALUES (1,3,'lets go dude');

INSERT INTO address (longitude,lat,street,street2,city,state)
VALUES  (100.10,80.34,'123 way road','','Denver','CO'),
        (90.11,90.34,'323 red road','','Denver','CO'),
        (80.12,100.34,'523 back road','','Denver','CO'),
        (70.13,110.34,'623 road road','','Denver','CO');

INSERT INTO venue (name,description,hours,address_id,contact_id)
VALUES ('sputnik','fun place here','11:00AM-2:00PM',1,5),
      ('true brew','fun place here','11:00AM-3:00PM',2,6),
      ('skylark','fun place here','10:00AM-12:00PM',3,7),
      ('mcman bar & grill','fun place here','11:00AM-1:00PM',4,8);

INSERT INTO route (name) VALUES ('party route'),('fun route');

INSERT INTO route_venue (route_id,venue_id,spot) VALUES (1,1,1),(1,2,2),(1,3,3),(2,2,1),(2,3,2),(2,4,3);

INSERT INTO event (name,route_id,group_id,date)
VALUES ('pams birthday',1,1,now()),('friday night',2,1,now());

DROP USER 'crawluser'@'localhost';
CREATE USER 'crawluser'@'localhost' IDENTIFIED BY 'crawl';GRANT SELECT, INSERT, TRIGGER ON TABLE * TO 'crawluser'@'localhost';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'crawluser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
