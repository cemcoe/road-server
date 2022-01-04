const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');
var router = new Router();

router.get('/', (ctx, next) => {
  ctx.body = '/';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
});