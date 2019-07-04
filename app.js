const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('path');
const config = require('./config/index');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
app.use(koaBody({multipart: true,}));

const blogRouter = require('./routes/blog.js');
const commonRouter = require('./routes/index.js');


// 配置跨域
/*app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With')
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET');
    ctx.set('Access-Control-Allow-Credentials', true);
    ctx.set('Access-Control-Max-Age', 3600 * 24);
 await next();
});*/

//get和post请求参数
app.use(async (ctx, next) => {
  let params;
  if(typeof ctx.request.body === 'string') {
    params = JSON.parse(ctx.request.body);
  }
  else if(typeof ctx.request.body === 'object'){
    params = ctx.request.body;
  }
    ctx.params = {
      ...params,
      ...ctx.query
    };
    await next();
  });

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname , './public')))

app.use(blogRouter.routes());
app.use(commonRouter.routes());

// 在端口3000监听:
app.listen(config.port);
console.log('app started at port 3000...');