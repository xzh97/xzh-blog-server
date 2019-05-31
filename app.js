const Koa = require('koa');
const koaBody = require('koa-body');
const koaRouter = require('koa-router')();

const blogRouter = require('./routes/')
const config = require('./config/index')
const app = new Koa();

app.use(koaBody);
app.use(koaRouter.routes())

app.use(async (ctx, next) => {
    console.log(ctx)
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
    await next();
});
app.listen(config.port);
console.log(koaRouter.routes());
console.log('app started at port 3000...');