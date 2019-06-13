const router = require('koa-router')();
const koaBody = require('koa-body');
const blogController = require('../controller/blogController.js');

/**
 * @description 博客列表
 */
router.get('/api/blog/list', blogController.getBlogList);

/**
 * @description 博客详情
 * @param id blogID
 */
router.get('/api/blog/detail/:blogOID',blogController.getBlogDetail);

/**
 * @description 创建博客 
 */
router.post('/api/blog/create',blogController.createNewBlog);

module.exports = router;