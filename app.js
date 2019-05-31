const Koa = require('koa');
const config = require('./config/index.js')
const koaBody = require('koa-body');

const koaRouter = require('koa-router')
const router = new koaRouter();
//const blogRouter = require('./routes/blog');

const app = new Koa();

//middleware
//app.use(koaBody);
app.use(koaRouter);

//router
//blogRouter(app)

//example
router.get('/',async ctx => {
    console.log(ctx)
    ctx.response.type = 'text/html';
    ctx.response.html = '<h1>HELLO WORLD</h1>'
})

app.use(require('./routes/blog.js'),router.routes(),router.allowedMethods());

app.listen(config.port,() => {
    console.log(`server is running at http://localhost:${config.port}`);
});