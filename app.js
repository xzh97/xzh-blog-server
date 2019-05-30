const Koa = require('koa');
const koaBody = require('koa-body');
const koaRouter = require('koa-router');
const app = new Koa();

app.use(koaBody);
app.use(koaRouter);

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>Hello, koa2!</h1>';
});
app.listen(3000);
console.log('app started at port 3000...');