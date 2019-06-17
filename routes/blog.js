const router = require('koa-router')();
const koaBody = require('koa-body');
const blogController = require('../controller/blogController.js');

/**
 * @description 文章列表
 */
router.get('/api/blog/list', blogController.getBlogList);

/**
 * @description 文章详情
 * @param id blogID
 */
router.get('/api/blog/detail/:blogOID',blogController.getBlogDetail);

/**
 * @description 创建文章 
 */
router.post('/api/blog/create',blogController.createNewBlog);

/**
 * @description 更新文章 
 */
router.put('/api/blog/update',blogController.updateBlog);

module.exports = router;