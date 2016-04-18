/*
Navicat MySQL Data Transfer

Source Server         : Localhost-ThisPC
Source Server Version : 50628
Source Host           : localhost:3306
Source Database       : e-mch

Target Server Type    : MYSQL
Target Server Version : 50628
File Encoding         : 65001

Date: 2016-04-18 12:23:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for e-mch-table
-- ----------------------------
DROP TABLE IF EXISTS `e-mch-table`;
CREATE TABLE `e-mch-table` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `MessageID` int(50) DEFAULT NULL,
  `UpTime` int(50) DEFAULT NULL,
  `ClockTime` varchar(50) DEFAULT NULL,
  `Temperature` varchar(20) DEFAULT NULL,
  `Battery` varchar(20) DEFAULT NULL,
  `Protocol` varchar(20) DEFAULT NULL,
  `RTT` varchar(20) DEFAULT NULL,
  `PowTrace` text CHARACTER SET utf8,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=398 DEFAULT CHARSET=latin1;
