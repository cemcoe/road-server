
import path from 'node:path';
// 上传图片
async function upload(ctx) {
  const file = ctx.request.files.file
  // file 可自己定义，但要和前端一一对应
  const basename = path.basename(file.path)
  ctx.body = {
    status: 200,
    data: {
      url: `/uploads/${basename}`
    }
  }
}



export { upload };
