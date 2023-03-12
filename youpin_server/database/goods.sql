/*
 Navicat MySQL Data Transfer

 Source Server         : DEMOTEST
 Source Server Type    : MySQL
 Source Server Version : 50151 (5.1.51-community)
 Source Host           : localhost:3306
 Source Schema         : youpin

 Target Server Type    : MySQL
 Target Server Version : 50151 (5.1.51-community)
 File Encoding         : 65001

 Date: 29/11/2022 16:01:42
*/

SET NAMES utf8;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '标题',
  `price` float NULL DEFAULT NULL COMMENT '价格',
  `description` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '描述',
  `pimgs` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '物品图片',
  `classify` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '类分',
  `specification` char(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '规格',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 31 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = COMPACT;

-- ----------------------------
-- Records of goods
-- ----------------------------
INSERT INTO `goods` VALUES (1, 'Xiaomi 11 Ultra', 5699, '安卓之光，浅望长焦', 'http://localhost:7001/public/image/cea1ff3517387569b7f59fc2b7d01d30.png', '小米手机', '123');
INSERT INTO `goods` VALUES (2, 'Redmi Note 12 Pro', 1699, 'Redmi', 'http://localhost:7001/public/image/2076616e_63b8_4a3b_997d_c609ca26aa33.webp', '红米手机', '123');
INSERT INTO `goods` VALUES (3, 'Xiaomi 12S Pro', 4399, '莱卡调教,必买，骁龙8+', 'http://localhost:7001/public/image/b5768335_8aba_4712_acf0_23d87b419924.webp', '小米手机', '123');
INSERT INTO `goods` VALUES (4, 'Xiaomi 12S Ultra', 6499, '莱卡调教，必买，骁龙8+', 'http://localhost:7001/public/image/ff57d3b0_5f06_4a26_b9a1_1f9d471f871f.webp', '小米手机', '123');
INSERT INTO `goods` VALUES (5, 'Redmi K50 Ultra', 3099, '游戏手机,骁龙8+，必买', 'http://localhost:7001/public/image/d4b20e07_e701_4914_987b_877daccb2ccd.webp', '红米手机', '123');
INSERT INTO `goods` VALUES (6, 'Redmi Note 12 Pro +', 2199, 'Redmi', 'http://localhost:7001/public/image/b14dcc2c_ada5_4adc_b6d2_1b671cff7d10.webp', '红米手机', NULL);
INSERT INTO `goods` VALUES (7, 'Redmi K50', 2499, 'Redmi', 'http://localhost:7001/public/image/a44e3603_3d9b_4aad_a692_0ab19b94aa3c.webp', '秒杀', NULL);
INSERT INTO `goods` VALUES (8, 'Redmi K50 Pro', 2999, 'Redmi，必买', 'http://localhost:7001/public/image/45b0c1e9_152b_429d_a882_ff80e5b766e1.webp', '红米手机', NULL);
INSERT INTO `goods` VALUES (9, 'Redmi K40S', 1799, 'Redmi', 'http://localhost:7001/public/image/fe38bb3c_e8ed_4119_ae3b_2e49fb136c6e.webp', '红米手机', NULL);
INSERT INTO `goods` VALUES (10, 'Xiaomi MIX Fold 2', 8999, '折叠屏，必买', 'http://localhost:7001/public/image/2ee97402_1de2_401f_871e_376872bed839.webp', '小米手机', NULL);
INSERT INTO `goods` VALUES (11, 'Xiaomi 12 Pro 天玑版', 2999, '天玑处理器', 'http://localhost:7001/public/image/9b88e14c_3e8d_45a0_ab31_e0f8b7d3b6ab.webp', '秒杀', NULL);
INSERT INTO `goods` VALUES (12, 'Xiaomi 12S', 3699, '小屏旗舰，必买', 'http://localhost:7001/public/image/b0e07a73_4156_4c4a_8bac_fc4f6d9b3acb.webp', '小米手机', NULL);
INSERT INTO `goods` VALUES (13, 'Redmi Note 11T Pro +', 1899, 'Redmi', 'http://localhost:7001/public/image/41ba0b73_aef4_409b_a898_9d32b2416d3d.webp', '红米手机', NULL);
INSERT INTO `goods` VALUES (17, '四川爱媛38号冰糖橙 可以吸着吃的橙子 手剥橙 爱媛5斤大水果', 39.9, '果形饱满 果肉化渣 甜蜜多汁', 'https://img.youpin.mi-img.com/shop-fe/98ef43c7_b4ba_470e_b761_b913863259a6.jpeg@base@tag=imgScale&F=webp', '水果', '爱媛5斤中果；爱媛5斤大果');
INSERT INTO `goods` VALUES (18, '大希地整切西冷菲力牛排1000g送刀叉酱包', 149, '甄选牛排,原肉整切,非拼接,品质保证', 'https://img.youpin.mi-img.com/shopmain/0758419a94504cc0f3bf055f6d132f13.jpeg@base@tag=imgScale&F=webp&h=1080&w=1080?w=1080&h=1080', '零食', NULL);
INSERT INTO `goods` VALUES (19, '米家户外电源', 1299, '1度电长续航，1.5小时自充80%，5类接口全覆盖，急速补能', 'https://img.youpin.mi-img.com/youpin_gms/ac4e2b6d_e5fd_4ebc_a6e8_2f20d6da7310.jpeg?w=800&h=800', '新品', '米家户外电源1000；米家太阳能板100W');
INSERT INTO `goods` VALUES (20, '北创烤肉肠', 38, '北创，来自自家厨房的味道', 'https://img.youpin.mi-img.com/shop-fe/c3c25c09_02e9_47e6_8564_f9c0aafe1f71.jpeg', '秒杀', '42盒装；48盒装');
INSERT INTO `goods` VALUES (21, '航天气凝绒抗寒服', 399, '航天气凝绒保暖机能抗寒服外套 M 静谧黑-G510常规款-男女同款', 'https://img.youpin.mi-img.com/shop-fe/b0886797_e946_4ad4_8c92_8b1ad9ec2ce7.jpeg@base@tag=imgScale&F=webp', '众筹', 'M；L；XL');
INSERT INTO `goods` VALUES (22, '美仕杰 多功能魔方集成灶', 4399, NULL, 'https://img.youpin.mi-img.com/shop-fe/5a15420b_77aa_41aa_9fc5_c1e2efd454df.jpeg@base@tag=imgScale&F=webp', '众筹', '天然气；液化气');
INSERT INTO `goods` VALUES (23, '极蛋镜片擦拭清洁湿巾', 28.9, '除尘去指纹,三秒速干,环保湿强纸,一片多用', 'https://img.youpin.mi-img.com/shop-fe/16038fd0_ef95_4c9d_b236_8df5c444e3a8.jpeg@base@tag=imgScale&F=webp', '新品', '1盒装；3盒装；5盒装');
INSERT INTO `goods` VALUES (24, '云米AI空调 Master (除甲醛版)', 3999, 'AI离,在线语音交互,高温自清洁 ,尽享干净风,新国标一级', 'https://img.youpin.mi-img.com/shop-fe/80b81014_7cd6_4f27_8cf2_94312fa1c234.jpeg@base@tag=imgScale&F=webp', '新品', NULL);
INSERT INTO `goods` VALUES (25, '智能泡茶保温杯', 59, '一触温显,316不锈钢,茶水分离,杯身加茶仓400ml大容量', 'https://img.youpin.mi-img.com/shopmain/a95a0bfc3ce93d4572eb419c4d532224.jpg@base@tag=imgScale&F=webp&h=1080&w=1080?w=1080&h=1080', '秒杀', '经典版；PC(非数显)；玻璃泡茶杯');
INSERT INTO `goods` VALUES (26, '红帆优农新疆阿克苏冰糖心苹果 水果', 79.9, '成都仓 中通快递 包邮', 'https://img.youpin.mi-img.com/shop-fe/abf203ee_8aed_416b_9fc3_1210017dd1f6.jpeg@base@tag=imgScale&F=webp', '新品', '家庭装');
INSERT INTO `goods` VALUES (27, '华硕台式电脑主机影音娱乐主机十代酷睿I5/I3 标配（单主机） I3-10100/8G/256G/核显', 1749, '华硕办公商务酷睿台式电脑主机', 'https://img.youpin.mi-img.com/shop-fe/2de2b171_7d92_4cd8_926f_0dcda37947a8.jpeg@base@tag=imgScale&F=webp', '秒杀', '标配（单主机）；套装（主机+23.8英寸直面显示器）');
INSERT INTO `goods` VALUES (28, '红米 10A', 699, '背部指纹轻松解锁｜5000mAh大电量｜G25八核处理器', 'https://img.youpin.mi-img.com/youpin_gms/1abdc5b8_ea69_4eda_901c_44814d3f66bb.png@base@tag=imgScale&F=webp&h=800&w=800?w=800&h=800', '新品', '4GB+64GB；4GB+128GB；6GB+128GB');
INSERT INTO `goods` VALUES (29, '黑鲨4 Pro', 3499, '120W极速闪充，4500mAh双电竞电池', 'https://img.youpin.mi-img.com/youpin_gms/d078c689_842f_4eda_b41d_b100efb01fee.jpeg@base@tag=imgScale&F=webp&h=1080&w=1080?w=1080&h=1080', NULL, '8GB+256GB；16GB+512GB');
INSERT INTO `goods` VALUES (30, '黑鲨4S', 2699, '高通骁龙870处理器，120W超级闪充，磁动力升降肩键', 'https://res.youpin.mi-img.com/youpin_gms/6db6684f_0d6c_42fd_8f27_8cd81136c6e7.jpeg?w=1080&h=1080', '新品', '8GB+256GB；16GB+512GB');

SET FOREIGN_KEY_CHECKS = 1;
