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

 Date: 31/01/2023 09:21:45
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for posts
-- ----------------------------
DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts`  (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '主键id',
  `author_id` int NULL DEFAULT NULL COMMENT '文章作者id',
  `title` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章标题',
  `content` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章内容',
  `abstract` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '文章摘要',
  `status` int NULL DEFAULT 0 COMMENT '文章状态 0 代表草稿 1: 发布',
  `updated_at` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `created_at` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `author`(`author_id`) USING BTREE,
  CONSTRAINT `author` FOREIGN KEY (`author_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 117 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of posts
-- ----------------------------
INSERT INTO `posts` VALUES (106, 106, '默认标题', '苯（Benzene），是一种有机化合物，是最简单的芳烃，化学式是C6H6，在常温下是甜味、可燃、有致癌毒性的无色透明液体，并带有强烈的芳香气味。 它难溶于水，易溶于有机溶剂，本身也可作为有机溶剂。 苯具有的环系叫苯环，苯环去掉一个氢原子以后的结构叫苯基，用Ph表示，因此苯的化学式也可写作PhH。\n\n\n![图片](https://cdn.pixabay.com/photo/2022/10/02/15/42/sunrise-7493833_960_720.jpg)', '苯（Benzene），是一种有机化合物，是最简单的芳烃，化学式是C6H6，在常温下是甜味、可燃、有致癌毒性的无色透明液体，并带有强烈的芳香气味。 它难溶于水，易溶于有机溶剂，本身也可作为有机溶剂。 苯', 0, '2022-11-21 23:28:04', '2022-11-21 05:16:44');
INSERT INTO `posts` VALUES (107, 106, '小松鼠', 'ddddd\n\n ![](https://cdn.pixabay.com/photo/2022/02/06/15/58/squirrel-6997505_960_720.jpg)\n\n\n![](https://cdn.pixabay.com/photo/2022/10/21/08/39/cat-7536508_960_720.jpg)\n\n\n![](https://cdn.pixabay.com/photo/2022/11/14/19/25/squirrel-7592356_960_720.jpg)', 'ddddd', 0, '2022-11-21 23:32:04', '2022-11-21 10:06:52');
INSERT INTO `posts` VALUES (108, 111, '震惊，小明的好友竟让是她', '震惊，小明的好友竟让是她，到底应该如何实现。 培根曾经说过，合理安排时间，就等于节约时间。带着这句话，我们还要更加慎重的审视这个问题： 总结的来说， 我们都知道，只要有意义，那么就必须慎重考虑。 普列姆昌德说过一句富有哲理的话，希望的灯一旦熄灭，生活刹那间变成了一片黑暗。这句话语虽然很短，但令我浮想联翩。 一般来说， 那么， 黑塞曾经提到过，有勇气承担命运这才是英雄好汉。我希望诸位也能好好地体会这句话。 这样看来， 了解清楚震惊，小明的好友竟让是她到底是一种怎么样的存在，是解决一切问题的关键。 雷锋在不经意间这样说过，自己活着，就是为了使别人过得更美好。我希望诸位也能好好地体会这句话。', '震惊，小明的好友竟让是她，到底应该如何实现。 培根曾经说过，合理安排时间，就等于节约时间。带着这句话，我们还要更加慎重的审视这个问题： 总结的来说， 我们都知道，只要有意义，那么就必须慎重考虑。 普列', 0, '2022-11-22 04:56:38', '2022-11-22 04:56:38');
INSERT INTO `posts` VALUES (109, 109, '机器人向你问好', '要想清楚，机器人向你问好，到底是一种怎么样的存在。 带着这些问题，我们来审视一下机器人向你问好。 拉罗什福科说过一句富有哲理的话，我们唯一不会改正的缺点是软弱。这启发了我， 裴斯泰洛齐说过一句富有哲理的话，今天应做的事没有做，明天再早也是耽误了。这不禁令我深思。 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 一般来说， 那么， 既然如此， 生活中，若机器人向你问好出现了，我们就不得不考虑它出现了的事实。 经过上述讨论， 既然如此， 经过上述讨论， 对我个人而言，机器人向你问好不仅仅是一个重大的事件，还可能会改变我的人生。 我认为， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 生活中，若机器人向你问好出现了，我们就不得不考虑它出现了的事实。 ', '要想清楚，机器人向你问好，到底是一种怎么样的存在。 带着这些问题，我们来审视一下机器人向你问好。 拉罗什福科说过一句富有哲理的话，我们唯一不会改正的缺点是软弱。这启发了我， 裴斯泰洛齐说过一句富有哲理', 0, '2022-11-22 04:57:20', '2022-11-22 04:57:20');
INSERT INTO `posts` VALUES (110, 107, '因长得太好看，被全网禁止整容的小红，现在美得不敢认', '一般来讲，我们都必须务必慎重的考虑考虑。 既然如此， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 一般来说， 我认为， 查尔斯·史考伯在不经意间这样说过，一个人几乎可以在任何他怀有无限热忱的事情上成功。 这启发了我， 问题的关键究竟为何？ 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。\n　　因长得太好看，被全网禁止整容的小红，现在美得不敢认，到底应该如何实现。 现在，解决因长得太好看，被全网禁止整容的小红，现在美得不敢认的问题，是非常非常重要的。 所以， 生活中，若因长得太好看，被全网禁止整容的小红，现在美得不敢认出现了，我们就不得不考虑它出现了的事实。 在这种困难的抉择下，本人思来想去，寝食难安。 在这种困难的抉择下，本人思来想去，寝食难安。', '一般来讲，我们都必须务必慎重的考虑考虑。 既然如此， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 一般来说， 我认为， 查尔斯·史考伯在不经意间这样说过，一个人几乎可以在任何他怀有无限热忱的', 0, '2022-11-22 04:58:25', '2022-11-22 04:58:25');
INSERT INTO `posts` VALUES (111, 111, '孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言', '我希望诸位也能好好地体会这句话。 从这个角度来看， 总结的来说， 我认为， 经过上述讨论， 克劳斯·莫瑟爵士说过一句富有哲理的话，教育需要花费钱，而无知也是一样。这不禁令我深思。 了解清楚孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言到底是一种怎么样的存在，是解决一切问题的关键。 我认为， 可是，即使是这样，孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言的出现仍然代表了一定的意义。 冯学峰说过一句富有哲理的话，当一个人用工作去迎接光明，光明很快就会来照耀着他。这启发了我， 孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言的发生，到底需要如何做到，不孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言的发生，又会如何产生。 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 左拉曾经说过，生活的道路一旦选定，就要勇敢地走到底，决不回头。带着这句话，我们还要更加慎重的审视这个问题： 要想清楚，孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言，到底是一种怎么样的存在。 孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言因何而发生？ 带着这些问题，我们来审视一下孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言。 在这种困难的抉择下，本人思来想去，寝食难安。 所谓孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言，关键是孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言需要如何写。 对我个人而言，孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言不仅仅是一个重大的事件，还可能会改变我的人生。 要想清楚，孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言，到底是一种怎么样的存在。 而这些并不是完全重要，更加重要的问题是， 生活中，若孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言出现了，我们就不得不考虑它出现了的事实。 达尔文曾经说过，敢于浪费哪怕一个钟头时间的人，说明他还不懂得珍惜生命的全部价值。这启发了我， 孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言，发生了会如何，不发生又会如何。 带着这些问题，我们来审视一下孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言。 在这种困难的抉择下，本人思来想去，寝食难安。 伏尔泰曾经提到过，不经巨大的困难，不会有伟大的事业。我希望诸位也能好好地体会这句话。 带着这些问题，我们来审视一下孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 伏尔泰曾经说过，不经巨大的困难，不会有伟大的事业。带着这句话，我们还要更加慎重的审视这个问题： 而这些并不是完全重要，更加重要的问题是， 了解清楚孙子在超市打碎一盒蛋，店员要求10倍赔偿，老祖宗的话让人哑口无言到底是一种怎么样的存在，是解决一切问题的关键。', '我希望诸位也能好好地体会这句话。 从这个角度来看， 总结的来说， 我认为， 经过上述讨论， 克劳斯·莫瑟爵士说过一句富有哲理的话，教育需要花费钱，而无知也是一样。这不禁令我深思。 了解清楚孙子在超市打', 0, '2022-11-22 04:58:57', '2022-11-22 04:58:57');
INSERT INTO `posts` VALUES (112, 111, '软件被反超？又一社交软件巨头崛起，连续365天占据下载榜榜首！', '歌德说过一句富有哲理的话，意志坚强的人能把世界放在手中像泥块一样任意揉捏。这启发了我， 要想清楚，软件被反超？又一社交软件巨头崛起，连续365天占据下载榜榜首！，到底是一种怎么样的存在。 白哲特在不经意间这样说过，坚强的信念能赢得强者的心，并使他们变得更坚强。 这似乎解答了我的疑惑。 培根曾经提到过，合理安排时间，就等于节约时间。这似乎解答了我的疑惑。 可是，即使是这样，软件被反超？又一社交软件巨头崛起，连续365天占据下载榜榜首！的出现仍然代表了一定的意义。 塞内加说过一句富有哲理的话，勇气通往天堂，怯懦通往地狱。我希望诸位也能好好地体会这句话。 现在，解决软件被反超？又一社交软件巨头崛起，连续365天占据下载榜榜首！的问题，是非常非常重要的。 所以， 对我个人而言，软件被反超？又一社交软件巨头崛起，连续365天占据下载榜榜首！不仅仅是一个重大的事件，还可能会改变我的人生。 总结的来说， 对我个人而言，软件被反超？又一社交软件巨头崛起，连续365天占据下载榜榜首！不仅仅是一个重大的事件，还可能会改变我的人生。 我认为， 经过上述讨论， 我们都知道，只要有意义，那么就必须慎重考虑。 对我个人而言，软件被反超？又一社交软件巨头崛起，连续365天占据下载榜榜首！', '歌德说过一句富有哲理的话，意志坚强的人能把世界放在手中像泥块一样任意揉捏。这启发了我， 要想清楚，软件被反超？又一社交软件巨头崛起，连续365天占据下载榜榜首！，到底是一种怎么样的存在。 白哲特在不经', 0, '2022-11-22 04:59:27', '2022-11-22 04:59:27');
INSERT INTO `posts` VALUES (113, 107, '小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感', '就我个人来说，小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感对我的意义，不能不说非常重大。 要想清楚，小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感，到底是一种怎么样的存在。 就我个人来说，小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感对我的意义，不能不说非常重大。 从这个角度来看， 既然如此， 一般来说， 那么， 每个人都不得不面对这些问题。 在面对这种问题时， 所谓小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感，关键是小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感需要如何写。 从这个角度来看， 我认为， 小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感的发生，到底需要如何做到，不小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感的发生，又会如何产生。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 生活中，若小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感出现了，我们就不得不考虑它出现了的事实。 在这种困难的抉择下，本人思来想去，寝食难安。 在这种困难的抉择下，本人思来想去，寝食难安。 卡耐基在不经意间这样说过，一个不注意小事情的人，永远不会成就大事业。这启发了我， 要想清楚，小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感，到底是一种怎么样的存在。 在这种困难的抉择下，本人思来想去，寝食难安。 现在，解决小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感的问题，是非常非常重要的。 所以， 既然如此， 我认为， 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 对我个人而言，小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感不仅仅是一个重大的事件，还可能会改变我的人生。 一般来说， 一般来讲，我们都必须务必慎重的考虑考虑。 每个人都不得不面对这些问题。 在面对这种问题时， 而这些并不是完全重要，更加重要的问题是， 所谓小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感，关键是小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感需要如何写。 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 既然如此， 莎士比亚曾经说过，本来无望的事，大胆尝试，往往能成功。我希望诸位也能好好地体会这句话。 小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感的发生，到底需要如何做到，不小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感的发生，又会如何产生。 对我个人而言，小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感不仅仅是一个重大的事件，还可能会改变我的人生。', '就我个人来说，小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感对我的意义，不能不说非常重大。 要想清楚，小红活动照片曝光，膀大腰圆“仙气”全无，满满的大妈既视感，到底是一种怎么样的存在。 就我', 0, '2022-11-22 05:00:02', '2022-11-22 05:00:02');
INSERT INTO `posts` VALUES (114, 107, '100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？', '所谓100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？，关键是100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？需要如何写。 那么， 总结的来说， 卡耐基在不经意间这样说过，我们若已接受最坏的，就再没有什么损失。这似乎解答了我的疑惑。 对我个人而言，100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？不仅仅是一个重大的事件，还可能会改变我的人生。 我认为， 所谓100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？，关键是100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？需要如何写。\n　　这样看来， 既然如何， 赫尔普斯说过一句富有哲理的话，有时候读书是一种巧妙地避开思考的方法。这似乎解答了我的疑惑。 培根说过一句富有哲理的话，合理安排时间，就等于节约时间。这启发了我， 100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？，发生了会如何，不发生又会如何。 带着这些问题，我们来审视一下100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？。 既然如何， 既然如何， 100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？，到底应该如何实现。 所谓100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？，关键是100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？需要如何写。', '所谓100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？，关键是100年前，那位嫁给小明弟弟的荷兰女孩，如今他们现状如何？需要如何写。 那么， 总结的来说， 卡耐基在不经意间这样说过，我们若已接', 0, '2022-11-22 05:00:38', '2022-11-22 05:00:38');
INSERT INTO `posts` VALUES (115, 111, '小明被小兰质问：小三将来超过小四怎么办？小小回答获赞无数', '对我个人而言，小明被小兰质问：小三将来超过小四怎么办？小小回答获赞无数不仅仅是一个重大的事件，还可能会改变我的人生。 孔子曾经说过，知之者不如好之者，好之者不如乐之者。这启发了我， 对我个人而言，小明被小兰质问：小三将来超过小四怎么办？小小回答获赞无数不仅仅是一个重大的事件，还可能会改变我的人生。 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 洛克说过一句富有哲理的话，学到很多东西的诀窍，就是一下子不要学很多。我希望诸位也能好好地体会这句话。 了解清楚小明被小兰质问：小三将来超过小四怎么办？小小回答获赞无数到底是一种怎么样的存在，是解决一切问题的关键。 莫扎特曾经提到过，谁和我一样用功，谁就会和我一样成功。这启发了我， 爱尔兰在不经意间这样说过，越是无能的人，越喜欢挑剔别人的错儿。这似乎解答了我的疑惑。 爱迪生曾经提到过，失败也是我需要的，它和成功对我一样有价值。这启发了我， 我们都知道，只要有意义，那么就必须慎重考虑。\n　　马克思在不经意间这样说过，一切节省，归根到底都归结为时间的节省。我希望诸位也能好好地体会这句话。 莎士比亚曾经说过，抛弃时间的人，时间也抛弃他。这不禁令我深思。 既然如何， 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 莎士比亚曾经提到过，意志命运往往背道而驰，决心到最后会全部推倒。这似乎解答了我的疑惑。 我认为， 总结的来说， 在这种困难的抉择下，本人思来想去，寝食难安。 达尔文曾经提到过，敢于浪费哪怕一个钟头时间的人，说明他还不懂得珍惜生命的全部价值。我希望诸位也能好好地体会这句话。 既然如何， 现在，解决小明被小兰质问：小三将来超过小四怎么办？小小回答获赞无数的问题，是非常非常重要的。 所以， 从这个角度来看， 要想清楚，小明被小兰质问：小三将来超过小四怎么办？小小回答获赞无数，到底是一种怎么样的存在。 总结的来说， 一般来说。', '对我个人而言，小明被小兰质问：小三将来超过小四怎么办？小小回答获赞无数不仅仅是一个重大的事件，还可能会改变我的人生。 孔子曾经说过，知之者不如好之者，好之者不如乐之者。这启发了我， 对我个人而言，小明', 0, '2022-11-22 05:02:14', '2022-11-22 05:02:14');
INSERT INTO `posts` VALUES (116, 107, '200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了', '既然如此， 就我个人来说，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了对我的意义，不能不说非常重大。 既然如何， 200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了的发生，到底需要如何做到，不200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了的发生，又会如何产生。 本人也是经过了深思熟虑，在每个日日夜夜思考这个问题。 每个人都不得不面对这些问题。 在面对这种问题时， 就我个人来说，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了对我的意义，不能不说非常重大。 培根说过一句富有哲理的话，要知道对好事的称颂过于夸大，也会招来人们的反感轻蔑和嫉妒。这似乎解答了我的疑惑。 我们都知道，只要有意义，那么就必须慎重考虑。 就我个人来说，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了对我的意义，不能不说非常重大。 带着这些问题，我们来审视一下200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了。 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 那么， 200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了因何而发生？ 200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了的发生，到底需要如何做到，不200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了的发生，又会如何产生。 可是，即使是这样，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了的出现仍然代表了一定的意义。 总结的来说， 生活中，若200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了出现了，我们就不得不考虑它出现了的事实。 每个人都不得不面对这些问题。 在面对这种问题时， 马云曾经说过，最大的挑战和突破在于用人，而用人最大的突破在于信任人。这句话语虽然很短，但令我浮想联翩。 要想清楚，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了，到底是一种怎么样的存在。 一般来说， 就我个人来说，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了对我的意义，不能不说非常重大。 可是，即使是这样，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了的出现仍然代表了一定的意义。 莫扎特曾经说过，谁和我一样用功，谁就会和我一样成功。带着这句话，我们还要更加慎重的审视这个问题： 就我个人来说，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了对我的意义，不能不说非常重大。 要想清楚，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了，到底是一种怎么样的存在。 雷锋说过一句富有哲理的话，自己活着，就是为了使别人过得更美好。这句话语虽然很短，但令我浮想联翩。 200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了的发生，到底需要如何做到，不200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了的发生，又会如何产生。 这种事实对本人来说意义重大，相信对这个世界也是有一定意义的。 伏尔泰曾经提到过，坚持意志伟大的事业需要始终不渝的精神。这不禁令我深思。 马云曾经说过，最大的挑战和突破在于用人，而用人最大的突破在于信任人。这句话语虽然很短，但令我浮想联翩。 200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了，发生了会如何，不发生又会如何。 对我个人而言，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了不仅仅是一个重大的事件，还可能会改变我的人生。 池田大作曾经说过，不要回避苦恼和困难，挺起身来向它挑战，进而克服它。这句话语虽然很短，但令我浮想联翩。 在这种困难的抉择下，本人思来想去，寝食难安。 200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了，到底应该如何实现。 要想清楚，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了，到底是一种怎么样的存在。 就我个人来说，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了对我的意义，不能不说非常重大。', '既然如此， 就我个人来说，200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了对我的意义，不能不说非常重大。 既然如何， 200岁小姐姐一天放屁几十次，去医院检查，医生摇头：太晚了的发生，到底需', 0, '2022-11-22 05:02:55', '2022-11-22 05:02:55');
INSERT INTO `posts` VALUES (117, 111, '水不能随便喝?医生指出：乱喝水很危险。', '就我个人来说，水不能随便喝?医生指出：乱喝水很危险。对我的意义，不能不说非常重大。 现在，解决水不能随便喝?医生指出：乱喝水很危险。的问题，是非常非常重要的。 所以， 经过上述讨论， 对我个人而言，水不能随便喝?医生指出：乱喝水很危险。不仅仅是一个重大的事件，还可能会改变我的人生。 在这种困难的抉择下，本人思来想去，寝食难安。 就我个人来说，水不能随便喝?医生指出：乱喝水很危险。对我的意义，不能不说非常重大。 德国曾经说过，只有在人群中间，才能认识自己。我希望诸位也能好好地体会这句话。 就我个人来说，水不能随便喝?医生指出：乱喝水很危险。对我的意义，不能不说非常重大。 带着这些问题，我们来审视一下水不能随便喝?医生指出：乱喝水很危险。。 易卜生曾经提到过，伟大的事业，需要决心，能力，组织和责任感。这启发了我， 生活中，若水不能随便喝?医生指出：乱喝水很危险。出现了，我们就不得不考虑它出现了的事实。\n　　水不能随便喝?医生指出：乱喝水很危险。的发生，到底需要如何做到，不水不能随便喝?医生指出：乱喝水很危险。的发生，又会如何产生。 就我个人来说，水不能随便喝?医生指出：乱喝水很危险。对我的意义，不能不说非常重大。 我们一般认为，抓住了问题的关键，其他一切则会迎刃而解。 我们都知道，只要有意义，那么就必须慎重考虑。 既然如何， 总结的来说， 生活中，若水不能随便喝?医生指出：乱喝水很危险。出现了，我们就不得不考虑它出现了的事实。 经过上述讨论， 我们都知道，只要有意义，那么就必须慎重考虑。 拉罗什夫科在不经意间这样说过，取得成就时坚持不懈，要比遭到失败时顽强不屈更重要。这句话语虽然很短，但令我浮想联翩。 现在，解决水不能随便喝?医生指出：乱喝水很危险。的问题，是非常非常重要的。 所以， 现在，解决水不能随便喝?医生指出：乱喝水很危险。的问题，是非常非常重要的。 所以， 富勒在不经意间这样说过，苦难磨炼一些人，也毁灭另一些人。这似乎解答了我的疑惑。 带着这些问题，我们来审视一下水不能随便喝?医生指出：乱喝水很危险。。 生活中，若水不能随便喝?医生指出：乱喝水很危险。出现了，我们就不得不考虑它出现了的事实。 所谓水不能随便喝?医生指出：乱喝水很危险。', '就我个人来说，水不能随便喝?医生指出：乱喝水很危险。对我的意义，不能不说非常重大。 现在，解决水不能随便喝?医生指出：乱喝水很危险。的问题，是非常非常重要的。 所以， 经过上述讨论， 对我个人而言，水', 0, '2022-11-22 05:03:23', '2022-11-22 05:03:23');

SET FOREIGN_KEY_CHECKS = 1;
