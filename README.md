# bookbox web server

bookbox api 服务

访问地址 [https://api.cemcoe.com/](https://api.cemcoe.com/)


项目采用 GitHub Action 进行自动化部署


接口参考[RESTful API 设计指南](https://www.ruanyifeng.com/blog/2014/05/restful_api.html)设计如下：

1. 通信协议，总是使用HTTPs协议
2. 将API部署在专用域名之下 api.cemcoe.com
3. 将API的版本号放入URL api.cemcoe.com/v1
4. 每个网址代表一种资源 API中的名词使用复数 api.cemcoe.com/v1/users
5. 使用 HTTP 动词 代表操作 GET api.cemcoe.com/v1/users
6. 过滤信息参数放到url中 GET api.cemcoe.com/v1/users?page=2&per_page=100
7. 状态码 GET api.cemcoe.com/v1/users?page=2&per_page=100 200
8. 错误处理 返回的信息中将error作为键名，出错信息作为键值
9. 服务器返回的数据格式，应该尽量使用JSON
