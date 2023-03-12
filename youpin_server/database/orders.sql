/*
MySQL Data Transfer
Source Host: localhost
Source Database: xiaomi
Target Host: localhost
Target Database: xiaomi
Date: 2022/11/22 10:16:54
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userid` int(11) DEFAULT NULL COMMENT '用户id',
  `goodsid` int(11) DEFAULT NULL COMMENT '商品id',
  `num` int(11) DEFAULT NULL COMMENT '商品数量',
  `total` int(11) DEFAULT NULL COMMENT '总计',
  `time` datetime DEFAULT NULL COMMENT '时间',
  `addressid` int(11) DEFAULT NULL COMMENT '地址id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records 
-- ----------------------------
