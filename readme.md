#安装
1. dev 开发分支
2. master 生产分支

## todoList

1. 考虑安全方面的问题（sql注入，准备把所有sql语句都改为预编译语句）
2. 修改项目架构为  controller -> service -> model 前两层对数据进行校验和转换， model层操作数据库
