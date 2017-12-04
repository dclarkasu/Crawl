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
  `zip` VARCHAR(11) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC))
ENGINE = InnoDB,
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `freind` ---------
-- -----------------------------------------------------

DROP TABLE IF EXISTS `friend` ;

CREATE TABLE IF NOT EXISTS `friend` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `friend_id` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_user_friend`
    FOREIGN KEY (`user_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_fr`
    FOREIGN KEY (`friend_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC)
)
ENGINE = InnoDB,
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
  `edited` TINYINT(1) NULL DEFAULT 0,
  `admin_id` INT(10) UNSIGNED NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC),
  CONSTRAINT `fk_route_user`
    FOREIGN KEY (`admin_id`)
    REFERENCES `user` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
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
  `admin_id` INT(10) UNSIGNED NULL DEFAULT NULL,
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
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_event_user`
    FOREIGN KEY (`admin_id`)
    REFERENCES `user` (`id`)
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

INSERT INTO `contact` VALUES
(1,'555-555-5555','bill@gmail.com'),
(2,'555-555-5556','lisa@gmail.com'),
(3,'555-555-5557','david@gmail.com'),
(4,'555-555-5558','pam@gmail.com'),
(5,'555-555-5559','sputnik@gmail.com'),
(6,'555-555-5510','true@gmail.com'),
(7,'555-555-5511','skylark@gmail.com'),
(8,'555-555-5512','mcman@gmail.com'),
(9,'720-228-7080','gmt@gmail.com'),
(10,'303-221-4660','tavertech@gmail.com'),
(11,'(303) 770-3100','stuff@gmail.com'),
(12,'(303) 770-4741','stuff@gmail.com'),
(13,'(303) 779-0805','true@gmail.com');

INSERT INTO user (first_name,last_name,contact_id) VALUES
('Bill','James',1),
('Lisa','Burns',2),
('David','Brown',3),
('Pam','Grey',4);

INSERT INTO `crawl_group` VALUES
(1,'Pub Day',3),
(2,'Skywalker',1);

INSERT INTO user_group (user_id, group_id) VALUES (2,1);
INSERT INTO user_group (user_id, group_id) VALUES (3,1);
INSERT INTO user_group (user_id, group_id) VALUES (4,1);

INSERT INTO user_group (user_id, group_id) VALUES (1,2);
INSERT INTO user_group (user_id, group_id) VALUES (2,2);
INSERT INTO user_group (user_id, group_id) VALUES (3,2);

INSERT INTO login (user_name,password,user_id) VALUES ('cage','$2a$10$Gs0mtbWIXqywHV8U43yrz.K4djTx1TLID1HS2iiGZgreM45Ysm1Ie',1);
INSERT INTO login (user_name,password,user_id) VALUES ('funngirl','$2a$10$Gs0mtbWIXqywHV8U43yrz.K4djTx1TLID1HS2iiGZgreM45Ysm1Ie',2);
INSERT INTO login (user_name,password,user_id) VALUES ('dudeman','$2a$10$Gs0mtbWIXqywHV8U43yrz.K4djTx1TLID1HS2iiGZgreM45Ysm1Ie',3);
INSERT INTO login (user_name,password,user_id) VALUES ('red','$2a$10$Gs0mtbWIXqywHV8U43yrz.K4djTx1TLID1HS2iiGZgreM45Ysm1Ie',4);

INSERT INTO post (group_id,user_id,message) VALUES (1,3,'lets go dude');

INSERT INTO `address` VALUES
(1,-104.9763,39.7699,'3563 Wazee St',NULL,'Denver','CO','80216'),
(2,-104.9736,39.7679,'3559 Larimer St',NULL,'Denver','CO','80205'),
(3,-104.9775,39.7642,'3200 Larimer St',NULL,'Denver','CO','80205'),
(4,-104.9928,39.7471,'1660 Champa St',NULL,'Denver','CO','80205'),
(5,-104.8962,39.6231,'8000 E Belleview Ave',NULL,'Greenwood Village','CO','80111'),
(6,-104.8884,39.6183,'5336 DTC Blvd','','Greenwood Village','CO','80111'),
(7,-104.8932,39.6253,'8101 E Belleview Ave',NULL,'Denver','CO','80237'),
(8,-104.8932,39.6253,'8101 E Belleview Ave',NULL,'Denver','CO','80237'),
(9,-104.8969,39.6384,'8000 E Quincy Ave','#1500','Denver','CO','80237');

INSERT INTO `venue` VALUES
(1,'Bigsby\'s Folly Craft Winery & Restaurant','Fun place here','11:00AM-2:00PM','http://theknow.denverpost.com/wp-content/uploads/2017/06/Bigsbys-Folly.1-Teri-Fotheringham-Photography.jpg',NULL,1,5,1),
(2,'Wine & Whey','Fun place here','11:00AM-3:00PM','https://s3-media2.fl.yelpcdn.com/bphoto/rNEYh29sphX-yUJQaRcJRg/348s.jpg',NULL,2,6,1),
(3,'The Infinite Monkey Theorem','Fun place here','10:00AM-12:00PM','http://www.denverpost.com/wp-content/uploads/2016/04/20141107__BZXXINFINITE_1_HC1_6528p1.jpg?w=620',NULL,3,7,1),
(4,'Mile High Wine Tours','Fun place here','11:00AM-1:00PM','https://media-cdn.tripadvisor.com/media/photo-s/05/dd/8d/58/mile-high-wine-tours.jpg',NULL,4,8,1),
(5,'Bar Louie','Upbeat grill chain with American grub, martinis & microbrews, plus happy-hour deals.','11:00AM-2:00AM','https://s3-media2.fl.yelpcdn.com/bphoto/vZTkAvjVl3Xbmk6Al_MEsQ/348s.jpg',NULL,5,9,1),
(6,'Tavern Tech Center','Outpost for pub grub, tons of HDTVs & amusements such as pool & shuffleboard plus weekend DJs.','11:00AM-2:00AM','https://s3-media3.fl.yelpcdn.com/bphoto/oWMsuSaxVF5g9px9Bi7gJw/ls.jpg',NULL,6,10,1),
(7,'Zane\'s Italian Bistro','Down-to-earth spot for pizza, pasta, wings & other Italian & American staples, plus a full bar.','11:00AM-2:00AM','https://s3-media2.fl.yelpcdn.com/bphoto/KjO1CB75yMkBj2kkQGEzew/o.jpg',NULL,7,11,1),
(8,'Great Northern','Comfort food & a big beer selection in a bright tavernlike setting with a crowded happy hour.','11:00AM-10:00PM','https://igx.4sqi.net/img/general/720x540/MBDUUIWDJW54AVGLDJ31FKRKJ1G44YFCOBNX4ZS4HIKSOKDH.jpg',NULL,8,12,1),
(9,'The Dam Grille','Industrial-style hangout with pool tables & a patio offering pub fare & local craft beers on tap.','11:00AM-2:00AM','https://media-cdn.tripadvisor.com/media/photo-s/03/fe/f4/d7/dam-grille.jpg',NULL,9,13,1);

INSERT INTO route (name,admin_id) VALUES ('Party Route',1),('Fun Route',2);

INSERT INTO route_venue (route_id,venue_id,spot) VALUES (1,1,1),(1,2,2),(1,3,3),(2,2,1),(2,3,2),(2,4,3);

INSERT INTO event (name,route_id,group_id,date,admin_id)
VALUES ('Pams Birthday',1,1,now(),1),('Friday Night',2,1,now(),2);

DROP USER IF EXISTS 'crawluser'@'localhost';
CREATE USER 'crawluser'@'localhost' IDENTIFIED BY 'crawl';GRANT SELECT, INSERT, TRIGGER ON TABLE * TO 'crawluser'@'localhost';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'crawluser'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
