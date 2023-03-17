import Router from "koa-router";
import { getShopItems, getItemById } from "../controller/mercari.js";

function mercariRoutes(router: Router) {
  // 获取商品列表
  router.get("/v1/mercari/get_items", getShopItems);
  // 获取商品详情
  // get?id=m88479087694
  router.get("/v1/mercari/get", getItemById);
}

export { mercariRoutes };
