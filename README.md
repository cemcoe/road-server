# road web server

road api 服务

访问地址 [https://api.cemcoe.com/](https://api.cemcoe.com/)

项目采用 GitHub Action 进行自动化部署

```shell
git clone git@github.com:cemcoe/road-server.git
npm install
npm run dev
```

```shell
npm run build
npm run preview
```

接口参考[RESTful API 设计指南](https://www.ruanyifeng.com/blog/2014/05/restful_api.html)设计如下：

1. 通信协议，总是使用 HTTPs 协议
2. 将 API 部署在专用域名之下 api.cemcoe.com
3. 将 API 的版本号放入 URL api.cemcoe.com/v1
4. 每个网址代表一种资源 API 中的名词使用复数 api.cemcoe.com/v1/users
5. 使用 HTTP 动词 代表操作 GET api.cemcoe.com/v1/users
6. 过滤信息参数放到 url 中 GET api.cemcoe.com/v1/users?page=2&per_page=100
7. 状态码 GET api.cemcoe.com/v1/users?page=2&per_page=100 200
8. 错误处理 返回的信息中将 error 作为键名，出错信息作为键值
9. 服务器返回的数据格式，应该尽量使用 JSON

用到的服务

- koa-body 解析 request body
- [rest-client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client) 在 vscode 中测试接口

---

用户登录后端实现整体思路：

1. 参数判断
   用户名称 非空判断
   用户密码 非空判断
2. 通过用户名查询用户记录，返回用户对象
3. 判断用户对象是否为空
4. 如果用户对象不为空，则将前端传递的用户密码与数据库中的密码比较
5. 判断密码是否正确
6. 如何密码正确，则登录成功，返回结果

Controller 层 （控制层：接收请求，响应结果）

1. 通过形参接收前端传来的参数
2. 调用业务层的登录方法，得到登录结果
3. 响应数据返回给前端

Service 层 （业务逻辑层：非空判断，条件判断等业务逻辑处理）

1. 参数判断，判断用户名，用户密码非空
   如果参数为空，抛出异常（异常被控制层捕获并处理）
2. 调用数据访问层，通过用户名查询用户记录，返回用户对象
3. 判断用户对象是否为空
   如果为空，抛出异常（异常被控制层捕获并处理）
4. 判断密码是否正确，比较前端传来的用户密码和数据库中的用户密码
   如果密码不相等，抛出异常（异常被控制层捕获并处理）
5. 如果密码正确，登录成功

Dao 层 （数据访问层：数据库中增删改查）
通过用户名查询用户记录

- https://stackoverflow.com/questions/62096269/cant-run-my-node-js-typescript-project-typeerror-err-unknown-file-extension
