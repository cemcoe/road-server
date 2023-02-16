import Router from "koa-router";
import jwt from "koa-jwt";
import { secret } from "../config.js";

import { create, login, getOwnerInfo, getOwnerPostList } from "../controllers/login.js";
import {
  getUsersList,
  getUserDetail,
  getUserPostList,
} from "../controllers/user.js";
import {
  createPost,
  getPostList,
  getPostDetail,
  updatePost,
} from "../controllers/post.js";

import {
  getSerialPostList
} from "../controllers/serial.js";

import { getSBTlist } from "../controllers/nft.js";

import { upload } from "../controllers/file.js";


const router = new Router();
const auth = jwt({ secret });
const auth_info = jwt({ secret, passthrough: true })

router.get("/", (ctx) => {
  ctx.body = "Welcome to use xbook api!";
});

// 用户注册
router.post("/v1/users", create);
// 用户登录
router.post("/v1/login", login);

// 获取登录用户信息
router.get("/v1/owner", auth, getOwnerInfo);
// 获取登录用户文章列表
router.get("/v1/owner/posts", auth, getOwnerPostList);


// ---------------

// 获取用户列表
router.get("/v1/users", getUsersList);

// ------文章相关------
// 创建新文章
router.post("/v1/posts", auth, createPost);

// 更新文章
router.patch("/v1/posts/:pid", updatePost);

// 获取文章列表
router.get("/v1/posts", getPostList);

// 获取文章详情
router.get("/v1/posts/:id", auth_info, getPostDetail);

// 获取用户详情
router.get("/v1/users/:uid", getUserDetail);

// 获取用户文章列表
router.get("/v1/users/:uid/posts", getUserPostList);

// 获取用户SBT
router.get("/v1/address/sbts", getSBTlist);
router.get("/v1/address/:address/sbts", getSBTlist);

// 获取连载文章列表
router.get("/v1/serial/:id", getSerialPostList);


// 上传图片
router.post("/v1/upload", upload);


export { router };
