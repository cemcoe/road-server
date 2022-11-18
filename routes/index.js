const Router = require("koa-router");
const router = new Router();
const jwt = require("koa-jwt");

const { secret } = require("../config");
const {
  create,
  getUsersList,
  login,
  getOwnerInfo,
  getUserDetail,
  getUserPostList,
} = require("../controllers/user.js");

const {
  createPost,
  getPostList,
  getPostDetail,
  updatePost,
} = require("../controllers/post.js");

router.get("/", (ctx) => {
  ctx.body = "欢迎使用书盒api";
});

// 用户注册
router.post("/v1/user", create);

// 获取用户列表
router.get("/v1/users", getUsersList);

// 用户登录
router.post("/v1/login", login);

const auth = jwt({ secret });
// 获取登录用户信息
router.get("/v1/owner", auth, getOwnerInfo);

// ------文章相关------
// 创建新文章
router.post("/v1/post", auth, createPost);

// 更新文章
router.put("/v1/post/:pid", updatePost);

// 获取文章列表
router.get("/v1/posts", getPostList);

// 获取文章详情
router.get("/v1/post/:id", getPostDetail);

// 获取用户详情
router.get("/v1/user/:uid", getUserDetail);

// 获取用户文章列表
router.get("/v1/user/:uid/posts", getUserPostList);

module.exports = router;
