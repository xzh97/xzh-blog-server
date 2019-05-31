const router = require('koa-router')();
const blogController = require('../controller/blogController.js');

/**
 * @description 博客列表
 */
router.get('/api/blog/list', /*blogController.getBlogList*/async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>this is blog list</h1>';
});

/**
 * @description 博客详情
 * @param id blogID
 */
router.get('/api/blog/detail/:id',/*blogController.getBlogDetail*/async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h1>this is blog detail</h1>';
});

module.exports = router;