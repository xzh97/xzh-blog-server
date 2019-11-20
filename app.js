const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('path');
const config = require('./config/index');
const init = require('./sql/db');

// 创建一个Koa对象表示web app本身:
const app = new Koa();
app.use(koaBody(
  {
    multipart: true,
    formidable:{
      //uploadDir:path.join(__dirname , './upload'), 可以直接把文件存到某文件夹下， 不过这里想自己处理试试
      //keepExtensions:true,
    }
  }
));

const blogRouter = require('./routes/blog.js');
const commonRouter = require('./routes/index.js');

//初始化sql表
init();

// 配置跨域
app.use(async (ctx, next) => {
    let reqOrigin = ctx.req.headers.origin;

    function isAllowedOrigin(origin){
        const whiteList = [
            'http://122.51.73.210',
            'http://122.51.73.210:3030',
        ];
        console.log('isAllowedOrigin',whiteList.includes(origin));
        return whiteList.includes(origin);

    }
    if(isAllowedOrigin(reqOrigin)){
        ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Access-Control-Allow-Origin')
        ctx.set('Access-Control-Allow-Origin', ctx.req.headers.origin);
        ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET,OPTIONS');
        if (ctx.request.method === "OPTIONS") {
            ctx.response.status = 200;
        }
    }
    await next();
});

//get和post请求参数(感觉这样子又不是很好QAQ 参数都混到一起了TAT)
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
app.use(koaStatic(path.join(__dirname , './static')))

app.use(blogRouter.routes());
app.use(commonRouter.routes());

// 在端口3000监听:
app.listen(config.port);
console.log(`app started at port ${config.port}...`);
