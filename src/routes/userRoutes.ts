import Router from "koa-router";

import {
  getUsersList,
  getUserDetail,
  getUserPostList,
} from "../controller/user.js";


function userRoutes(router: Router) {
  // 获取用户列表
  router.get("/v1/users", getUsersList);
  // 获取用户详情
  router.get("/v1/users/:uid", getUserDetail);

  // 获取用户文章列表
  router.get("/v1/users/:uid/posts", getUserPostList);
}

export {
  userRoutes
}