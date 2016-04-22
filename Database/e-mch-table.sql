/*
Navicat MySQL Data Transfer

Source Server         : Localhost-ThisPC
Source Server Version : 50628
Source Host           : localhost:3306
Source Database       : e-mch

Target Server Type    : MYSQL
Target Server Version : 50628
File Encoding         : 65001

Date: 2016-04-20 13:15:13
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for e-mch-table
-- ----------------------------
DROP TABLE IF EXISTS `e-mch-table`;
CREATE TABLE `e-mch-table` (
  `id` int(100) NOT NULL AUTO_INCREMENT,
  `MessageID` int(100) DEFAULT NULL,
  `UpTime` int(100) DEFAULT NULL,
  `ClockTime` varchar(100) DEFAULT NULL,
  `Temperature` varchar(100) DEFAULT NULL,
  `Battery` varchar(100) DEFAULT NULL,
  `Protocol` varchar(100) DEFAULT NULL,
  `RTT` varchar(100) DEFAULT NULL,
  `PowTrace` text CHARACTER SET utf8,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3398 DEFAULT CHARSET=latin1 COMMENT='SELECT * FROM `e-mch-table` WHERE Protocol= ''CoAP_1Sec_1Hop'';';
