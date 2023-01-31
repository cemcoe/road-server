/*
 Navicat Premium Data Transfer

 Source Server         : local
 Source Server Type    : MySQL
 Source Server Version : 80029
 Source Host           : localhost:3306
 Source Schema         : xbook

 Target Server Type    : MySQL
 Target Server Version : 80029
 File Encoding         : 65001

 Date: 31/01/2023 09:19:55
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for users
-- ----------------------------
DROP TABLE IF EXISTS `users`;
CREATE TABLE `users`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '用户名',
  `password` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `avatar` varchar(220) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户头像地址',
  `bio` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'bio',
  `wallet` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'ERC20钱包地址',
  `updated_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `created_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  UNIQUE INDEX `wallet`(`wallet`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 111 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of users
-- ----------------------------
INSERT INTO `users` VALUES (106, 'test', 'cemcoe', 'https://avatars.githubusercontent.com/u/29108504?v=4', NULL, NULL, NULL, '2022-11-21 05:06:59');
INSERT INTO `users` VALUES (107, '娱乐号', 'justdoit', NULL, NULL, NULL, NULL, '2022-11-22 04:45:30');
INSERT INTO `users` VALUES (108, '美食号', 'justdoit', NULL, NULL, NULL, NULL, '2022-11-22 04:45:43');
INSERT INTO `users` VALUES (109, '可爱号', 'justdoit', NULL, NULL, NULL, NULL, '2022-11-22 04:45:53');
INSERT INTO `users` VALUES (111, '震惊号', 'justdoit', NULL, NULL, NULL, NULL, '2022-11-22 04:50:08');

SET FOREIGN_KEY_CHECKS = 1;
