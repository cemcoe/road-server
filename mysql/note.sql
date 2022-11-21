

-- Structured Query Language
-- DDL 数据定义语言 定义数据库 定义表
-- DML 数据操纵语言
-- DCL 数据控制语言
-- DQL 数据查询语言





-- Data Definition Language --

-- DDL1.数据库DDL
-- DDL1.1查看所有数据库
show databases;

-- DDL1.2创建数据库
create database if not exists xbook;

-- DDL1.3切换操作数据库
use xbook;

-- DDL1.4删除数据库
drop database if exists xbook;


-- DDL2.表DDL

-- DDL2.1创建关键词表
-- TODO:类型说明&&约束条件
-- 类型：数值 日期 字符串 
-- 数据类型是指在创建表的时候为表中字段指定数据类型，只有数据符合类型要求才能存储起来，使用数据类型的原则是:够用就行，尽量使用取值范围小的，而不用大的，这样可以更多的节省存储空间。

-- 数值(主要): int double tinyint
-- 字符串(主要): varchar
-- 日期(主要)：DATETIME(YYY-MM-DD HH:MM:SS) TIMESTAMP(YYYYMMDD HHMMSS) date(YYYY-MM-DD)

-- 约束：constraint
-- 主键约束(primary key) PK
-- 自增长约束(auto_increment)
-- 非空约束(not null)
-- 唯一性约束(unique)
-- 默认约束(default)
-- 零填充约束(zerofill)
-- 外键约束(foreign key) FK


-- 用户表
create table if not exists users(
	-- 字段名1 类型[(宽度)] [约束条件] [comment '字段说明']
	id int primary key auto_increment comment '主键id',
	name varchar(20) unique not null comment '用户名', 
	password varchar(20) not null comment '密码',
	avatar varchar(220) comment '用户头像地址',
	bio varchar(20) comment 'bio',
	wallet varchar(20) unique comment 'ERC20钱包地址',
	updated_at datetime comment '更新时间',
	created_at datetime comment '创建时间'
) auto_increment=100;


-- 文章表
create table if not exists posts(
	-- 字段名1 类型[(宽度)] [约束条件] [comment '字段说明']
	id int primary key auto_increment comment '主键id', 
  author_id int comment '文章作者id',
	title varchar(60) not null comment '文章标题', 
	content varchar(2000) not null comment '文章内容',
	abstract varchar(500) not null comment '文章摘要',
	status int default 0 comment '文章状态 0 代表草稿 1: 发布',
	updated_at datetime comment '更新时间',
	created_at datetime comment '创建时间'
) auto_increment=100;

-- DDL2.2查看所有表
show tables;

-- DDL2.3查看指定表的创建语句
show create table users;

-- DDL2.4查看表结构
desc users;

-- DDL2.5删除表
drop table users;
drop table posts;

-- DDL 还有一些修改表结构的语句，但在设计表时，最好做到尽量不修改，使用时查询相应语句，这里不展示


-- -------------------------------------------------------------------------------


-- Data Manipulation Language --

-- TOOL: 查询表数据
SELECT * from users;
SELECT * from posts;


-- DML1.向表中插入数据
insert into users(name, password, created_at) values('cemcoe', 'justdoit', CURRENT_TIMESTAMP());
insert into users(name, password, created_at) values('test', '2020', CURRENT_TIMESTAMP());


insert into posts(author_id, title, abstract, content) values(100, 'title', 'abbb', 'content');
insert into posts(author_id, title, abstract, content, status) values(100, 'title', 'abbb', 'content', 1);


insert into posts(author_id, title, abstract, content) values(101, 'title', 'abbb', 'content');
insert into posts(author_id, title, abstract, content, status) values(101, 'title', 'abbb', 'content', 1);

insert into posts(author_id, title, abstract, content) values(101, 'title', 'abbb', 'content');
insert into posts(author_id, title, abstract, content, status) values(101, 'title', 'abbb', 'content', 1);


-- DML2.更新数据 
-- update 表名 set 字段名=值,字段名=值... where 条件;
update users set bio='我的态度我做主',avatar='hahaha' where id=101;

-- DML3.删除数据
-- delete from 表名 [where 条件];
delete from keywords where id=3;
-- delete from keywords 可以删除整个表数据，但id的起始值不是重1开始，不同于 truncate table keywords

-- DML4.重建表，删除整个表再重建
truncate table keywords;


-- ----------------------------------------------------------------------------------

-- Data Query Language

-- DQL0.认识语句
-- select 
--   [all|distinct]
--   <目标列的表达式1> [别名],
--   <目标列的表达式2> [别名]...
-- from <表名或视图名> [别名],<表名或视图名> [别名]...
-- [where<条件表达式>]
-- [group by <列名> 
-- [having <条件表达式>]]
-- [order by <列名> [asc|desc]]
-- [limit <数字或者列表>];

-- DQL1简单查询 
-- select *| 列名 from 表 where 条件

-- DQL1.1结果包含哪些字段
select * from users;
select * from users where id=100;
select id, name from users where id=100;


-- DQL1.2将结果的字段名重命名
select id, name as Name from users where id=100;

-- DQL1.3去掉重复值，拿到种类
select distinct bio from users;

-- DQL1.4对结果进行运算
select id+100, name from users where id=100;
select id+100 as newID, name from users where id=100;



-- DQL2条件查询
-- TODO:运算符，一部分比较运算符js是没有的 Like

-- DQL2.1%%
-- 含有太
select * from users where name like '%o%';
-- 以太开头
select * from users where name like '太%';
-- 第二个字为太
select * from users where name like '_太%';

-- DQL3.排序查询

-- select 
-- 字段名1，字段名2，……
-- from 表名
-- order by 字段名1 [asc|desc]，字段名2[asc|desc]……


-- 1.asc代表升序，desc代表降序，如果不写默认升序
-- 2.order by用于子句中可以支持单个字段，多个字段，表达式，函数，别名
-- 3.order by子句，放在查询语句的最后面。LIMIT子句除外


select * from users order by id desc;



-- DQL4.聚合查询
-- 聚合函数查询是纵向查询，它是对一列的值进行计算，然后返回一个单一的值；另外聚合函数会忽略空值。
-- 查询函数 count sum max min avg
-- DQL4.1输出符合条件的条数
-- 用户写的文章数
select count(*) as postsCount from posts where author_id=100;
-- DQL4.2输出符合条件的条目的id字段的和
-- 用户写的文章字数总数
-- 如何拿到varstring的长度？
select sum(id) from posts where author_id=100;



------


-- DQL5.分组查询
-- select 字段1,字段2… from 表名 group by 分组字段 having 分组条件;
-- 如果要进行分组的话，则SELECT子句之后，只能出现分组的字段和统计函数，其他的字段不能出现：
-- 根据typeid进行分组，输出各typeid下拥有的数目
-- 每个用户写的文章数目
select author_id, count(*) as postCount from posts group by author_id;

-- 对聚合结果进行过滤
-- 分组之后对统计结果进行筛选的话必须使用having，不能使用where
-- where子句用来筛选 FROM 子句中指定的操作所产生的行
-- group  by  子句用来分组 WHERE 子句的输出。
-- having 子句用来从分组的结果中筛选行
select author_id, count(*) as postCount from posts where status=1 group by author_id having count(*) > 0;


-- DQL5.分页查询
-- select 字段1，字段2... from 表明 limit m,n
-- m: 整数，表示从第几条索引开始，计算方式 （当前页-1）*每页显示条数
-- n: 整数，表示查询多少条数据
select * from users limit 0, 2;

-- -------------------------------------------------------------------





-- 多表操作
-- 准备表

-- users posts

-- 分析：一个user有多个post，一个post只能对应一个user
-- 实现原则：在多(posts)的一方建立外键，指向一的一方的主键(posts.author_id -> user.id)
-- 对于两个具有关联关系的表而言，相关联字段中主键所在的表就是主表（父表），外键所在的表就是从表（子表）

-- [constraint <外键名>] foreign key 字段名 [，字段名2，…] references <主表名> 主键列1 [，主键列2，…]
-- constraint emp_fk foreign key (dept_id) references dept (deptno) –- 外键约束

-- 用户表 主表
create table if not exists users(
	-- 字段名1 类型[(宽度)] [约束条件] [comment '字段说明']
	id int primary key auto_increment comment '主键id',
	name varchar(20) unique not null comment '用户名', 
	password varchar(20) not null comment '密码',
	avatar varchar(220) comment '用户头像地址',
	bio varchar(20) comment 'bio',
	wallet varchar(20) unique comment 'ERC20钱包地址',
	updated_at datetime comment '更新时间',
	created_at datetime comment '创建时间'
) auto_increment=100;

-- 文章表 从表
create table if not exists posts(
	-- 字段名1 类型[(宽度)] [约束条件] [comment '字段说明']
	id int primary key auto_increment comment '主键id', 
  author_id int comment '文章作者id',
	title varchar(60) not null comment '文章标题', 
	content varchar(2000) not null comment '文章内容',
	abstract varchar(500) not null comment '文章摘要',
	status int default 0 comment '文章状态 0 代表草稿 1: 发布',
	updated_at datetime comment '更新时间',
	created_at datetime comment '创建时间',
	-- [constraint <外键名>] foreign key 字段名 [，字段名2，…] references <主表名> 主键列1 [，主键列2，…]
	constraint author foreign key (author_id) references users (id) -- 外键必须为主表定义主键
) auto_increment=100;



-- -----------------外键约束对多表查询并无影响。-------------------------

-- 多表查询
-- 1. 交叉连接查询 [产生笛卡尔积，了解]
-- 语法：select * from A, B
select * from users, posts;

-- 2. 内连接查询
-- 隐式内连接 select * from A, B where 条件(where 添加表名)
-- 显示内连接 select * from A inner join B on 条件
-- 返回所有的文章列表
select posts.id, posts.author_id, posts.title, posts.abstract, posts.content, users.name  from users, posts where posts.author_id = users.id;
select * from posts inner join users on posts.author_id = users.id;


-- 3. 外连接查询
-- 左外连接 left outer join
-- select * from A left outer join B on 条件;
-- 右外连接 right outer join
-- selsct * from A right outer join B on 条件;
-- 满外连接 full outer join
-- select * from A full outer join B on 条件;
-- 没搞懂应用场景 左右是可互换的用一个就成



-- 函数---------------------------------------------------------
-- -------------------------------------------------------
-- 聚合函数
-- 数学函数
-- 字符串函数
-- 日期函数
-- 控制流函数
-- 窗口函数

-- 获取文章的字数
select *, CHAR_LENGTH(content) as wordcount from posts;

-- UNIX_TIMESTAMP() 返回从1970-01-01 00:00:00到当前毫秒值
-- CURRENT_TIMESTAMP() 返回当前日期和时间
insert into users(name, password, created_at) values('test', 'justdoit', CURRENT_TIMESTAMP());









