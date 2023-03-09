import path from 'node:path';
import { Context } from 'koa'

// 上传图片
async function upload(ctx: Context) {
  const file = ctx.request?.files?.file
  // console.log(file, 'file')
  // file 可自己定义，但要和前端一一对应
  // @ts-ignore
  const basename = path.basename(file?.path)

  ctx.body = {
    status: 200,
    data: {
      url: `${'/static/uploads/'}${basename}`
    }
  }
}



export { upload };
