const Koa = require('koa');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const path = require('path');
const config = require('./config/index');
const init = require('./sql/db');
const jwt = require('jsonwebtoken');

const blogRouter = require('./routes/blog.js');
const commonRouter = require('./routes/common.js');
const userRouter = require('./routes/user.js');

// 创建一个Koa对象表示web app本身:
const app = new Koa();

// 配置静态资源加载中间件
app.use(koaStatic(path.join(__dirname , './static')))

// 配置文件上传处理
app.use(koaBody(
  {
    multipart: true,
    formidable:{
      //uploadDir:path.join(__dirname , './upload'), 可以直接把文件存到某文件夹下， 不过这里想自己处理试试
      //keepExtensions:true, //是否保持原来的文件格式
    }
  }
));


//初始化sql表
init();

//请求参数处理
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
    // ...ctx.query
  };
  await next();
});

// ! 进行token验证 登录和注册接口不需要
// app.use(
//   async (ctx, next) => {
//     let ignorePaths = ['/api/token', '/api/register'];
//     console.log(ctx.url);
//     if(!ignorePaths.includes(ctx.url)){
      
//       const token = ctx.header && ctx.header.authorization && ctx.header.authorization.substr(7);
//       // console.log(token);
//       jwt.verify(token, 'xzh19971005',{algorithms: ['HS256'],}, (err, decoded) => {
//         console.log('token decoded err', err);
//         console.log('token decoded', decoded);
//         if(err){
//           // token校验失败
//           ctx.status = 401;
//           ctx.body = {
//             errCode: err.name,
//             errMsg: err.message,
//           }
//         }
//       })
//     }
//     await next();
//   }
// );

// 全局error处理
// app.use(async (ctx, next) => {
//   // todo 看下要怎么做全局处理错误这块
//   next();
// })

// 配置跨域
// if(process.env.NODE_ENV === 'prod'){
//   app.use(async (ctx, next) => {
//     let reqOrigin = ctx.req.headers.origin;

//     function isAllowedOrigin(origin){
//         const whiteList = [
//             'http://122.51.73.210',
//             'http://122.51.73.210:3000',
//             'http://122.51.73.210:3030',
//         ];
//         console.log('isAllowedOrigin',whiteList.includes(origin));
//         return whiteList.includes(origin);

//     }
//     if(isAllowedOrigin(reqOrigin)){
//         ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Access-Control-Allow-Origin')
//         ctx.set('Access-Control-Allow-Origin', ctx.req.headers.origin);
//         ctx.set('Access-Control-Allow-Methods', 'PUT,DELETE,POST,GET,OPTIONS');
//         if (ctx.request.method === "OPTIONS") {
//             ctx.response.status = 200;
//         }
//     }
//     await next();
// });
// }
// else{
//   // dev环境配置
// }

app.use(blogRouter.routes());
app.use(commonRouter.routes());
app.use(userRouter.routes());

// 在端口3000监听:
app.listen(config.port);
console.log(`app started at port ${config.port}...`);
