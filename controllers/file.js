import { runSqlStatement } from "../mysql/index.js";
import jsonwebtoken from "jsonwebtoken";
import { secret } from "../config.js";

// 上传图片
async function upload(ctx) {


  const file = ctx.request.files.file



  console.log(file)


  ctx.body = {
    status: 2001,
    mag: "开发中",
  };
}



export { upload };
