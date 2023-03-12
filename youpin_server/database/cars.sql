/*
MySQL Data Transfer
Source Host: localhost
Source Database: xiaomi
Target Host: localhost
Target Database: xiaomi
Date: 2022/11/22 10:16:39
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for cars
-- ----------------------------
DROP TABLE IF EXISTS `cars`;
CREATE TABLE `cars` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL COMMENT '用户id',
  `goodsid` int(11) DEFAULT NULL COMMENT '商品id',
  `goodsnum` int(11) DEFAULT NULL COMMENT '商品数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
