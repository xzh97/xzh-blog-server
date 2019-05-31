const router = require('koa-router')();
const blogController = require('../controller/blogController.js');

module.exports = app => {
    router.get('/api/blog/list', blogController.getBlogList);
    router.get('/api/blog/detail/:id',blogController.getBlogDetail);

    app.use(router,router.routes(),router.allowedMethods())
}