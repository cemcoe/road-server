import { Context } from "koa";
import mercariMapper from "../mappers/mercariMapper.js";

async function getShopItems(ctx: Context) {
  let { per_page = 10 } = ctx.query;
  let { page = 1 } = ctx.query;

  // @ts-ignore
  page = Math.max(page * 1, 1);
  // @ts-ignore
  per_page = Math.max(per_page * 1, 1);

  const n = per_page;
  const m = (page - 1) * n;

  // 查询用户列表
  const result = await mercariMapper.queryMercari(m, n);

  ctx.body = {
    status: 200,
    data: {
      shopItems: result,
    },
  };
}

async function getItemById(ctx: Context) {
  const { id } = ctx.request.query;
  // 查询用户列表
  const result = await mercariMapper.queryMercariItemById(id as string);

  ctx.body = {
    status: 200,
    data: {
      shopItem: result,
    },
  };
}

export { getShopItems, getItemById };
