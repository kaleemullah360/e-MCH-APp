/*
Navicat MySQL Data Transfer

Source Server         : Localhost-ThisPC
Source Server Version : 50628
Source Host           : localhost:3306
Source Database       : e-mch

Target Server Type    : MYSQL
Target Server Version : 50628
File Encoding         : 65001

Date: 2016-04-18 10:23:33
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for e-mch-table
-- ----------------------------
DROP TABLE IF EXISTS `e-mch-table`;
CREATE TABLE `e-mch-table` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `MessageID` int(255) DEFAULT NULL,
  `UpTime` int(255) DEFAULT NULL,
  `ClockTime` varchar(255) DEFAULT NULL,
  `Temperature` varchar(255) DEFAULT NULL,
  `Battery` varchar(255) DEFAULT NULL,
  `Protocol` varchar(255) DEFAULT NULL,
  `PowTrace` text CHARACTER SET utf8,
  `RTT` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=164 DEFAULT CHARSET=latin1;
