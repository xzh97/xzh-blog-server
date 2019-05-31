const Koa = require('koa');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
let router = require('./routes/blog.js');


app.use(router.routes());

// 在端口3000监听:
app.listen(3000);
console.log('app started at port 3000...');