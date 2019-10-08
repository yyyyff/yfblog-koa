> 数据表很大一部分参考typecho编写
> 写的比较粗

#### contents表
  |         键名 |     类型     |          属性          | 解释                 |
  | -----------: | :----------: | :--------------------: | :------------------- |
  |          cid |   int(10)    |     主键,非负,自增     | 主键                 |
  |        title | varchar(200) |           无           | 标题                 |
  |         slug | varchar(200) |      索引,可为空       | 内容缩略名           |
  |      content |     text     |           无           | 文章内容             |
  |        order |   int(10)    |      非负，可为空      | 排序?置顶            |
  |     authorId |   int(10)    |      非负,可为空       | 内容所属id           |
  |         type | varchar(16)  | 可为空，默认 'archive' | 文章类型？内容：页面 |
  |  commentsNum |   int(10)    |      非负,可为空       | 内容评论数           |
  |      viewNum |    int(10    |      非负，可为空      | 内容浏览量           |
  | allowComment |   char(1)    |     可为空，默认1      | 是否允许评论         |
  |    createdAt |   datetime   |      默认创建时间      | 创建时间             |
  |     updateAt |   datetime   |      默认更新时间      | 更新时间             |

#### metas 表
  |  键名 |     类型     |        属性         | 解释           |
  | ----: | :----------: | :-----------------: | :------------- |
  |   mid |   int(10)    |   主键,非负,自增    | 项目主键       |
  |  name | varchar(200) |       可为空        | 名称           |
  |  slug | varchar(200) |        索引         | 项目缩略名     |
  |  type | varchar(32)  |     默认'tags'      | 项目类型？分类 | 标签 |
  | count |   int(10)    |        非负         | 项目所属内容数 |
  
#### relationships 表
   | 键名 |  类型   |   属性    | 解释     |
   | ---: | :-----: | :-------: | :------- |
   |  cid | int(10) | 主键,非负 | 内容主键 |
   |  mid | int(10) | 主键,非负 | 项目主键 |

#### comments 表
   |      键名 |     类型     |      属性      | 解释           |
   | --------: | :----------: | :------------: | :------------- |
   |      coid |   int(10)    | 主键,非负,自增 | comment表主键  |
   |       cid |   int(10)    |   索引，非负   | post表主键     |
   |    author | varchar(200) |    不可为空    | 评论作者       |
   |  authorid |   int(10)    |  非负,可为空   | 评论所属用户id |
   |      mail | varchar(200) |     可为空     | 评论者邮件     |
   |       url | varchar(200) |     可为空     | 评论者网址     |
   |        ip | varchar(64)  |                | 评论者ip地址   |
   |     agent | varchar(20)  |                | 评论者客户端   |
   |      text |     text     |                | 评论内容       |
   |     close |   char(1)    |     默认0      | 禁用评论       |
   |    parent |   int(10)    |                | 父级评论       |
   | createdAt |   datetime   |  默认创建时间  | 创建时间       |

#### options 表
   |        键名 |     类型     |  属性  | 解释         |
   | ----------: | :----------: | :----: | :----------- |
   |       title | varchar(200) |        | 网站标题     |
   | description | varchar(200) | 可为空 | 网站描述     |
   |     keyword | varchar(200) | 可为空 | 网站关键词   |
   |    register |   char(1)    | 默认1  | 是否允许注册 |
   
### users 表
   |      键名 |     类型     |   属性   | 解释   |
   | --------: | :----------: | :------: | :----- |
   |  username | varchar(32)  |  不为空  | 用户名 |
   |  nickname | varchar(32)  |          | 昵称   |
   |    avatar | varchar(255) | 默认为空 | 头像   |
   |  password | varchar(255) |  不为空  | 密码   |
   |     email | varchar(255) |          | 邮箱   |
   | authLevel |   int(10)    |  默认99  | 权限   |