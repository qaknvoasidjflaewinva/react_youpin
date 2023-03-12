/*
MySQL Data Transfer
Source Host: localhost
Source Database: xiaomi
Target Host: localhost
Target Database: xiaomi
Date: 2022/11/22 10:16:44
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for comments
-- ----------------------------
DROP TABLE IF EXISTS `comments`;
CREATE TABLE `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsid` int(11) DEFAULT NULL,
  `userid` int(11) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL COMMENT '内容',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
