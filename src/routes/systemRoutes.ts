import Router from "koa-router";

import { upload } from "../controller/file.js";
import {
  getAppInfo
} from "../controller/app.js";

function systemRoutes(router: Router) {
  // 上传图片
  router.post("/v1/upload", upload);
  // 获取下载信息
  router.get("/v1/app", getAppInfo);
}

export {
  systemRoutes
}