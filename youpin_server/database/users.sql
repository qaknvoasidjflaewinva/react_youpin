/*
MySQL Data Transfer
Source Host: localhost
Source Database: xiaomi
Target Host: localhost
Target Database: xiaomi
Date: 2022/11/22 10:16:59
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` char(255) DEFAULT NULL COMMENT '昵称',
  `phone` char(255) DEFAULT NULL COMMENT '电话',
  `pwd` char(255) DEFAULT NULL COMMENT '码密',
  `headimg` char(255) DEFAULT NULL COMMENT '头像',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
