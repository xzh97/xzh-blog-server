const router = require('koa-router')();
const blogController = require('../controller/blog.js');

/**
 * @description 文章列表
 */
router.get('/api/blog/list', blogController.getBlogList);

/**
 * @description 文章详情
 * @param id blogID
 */
router.get('/api/blog/detail/:blogOid',blogController.getBlogDetail);

/**
 * @description 创建文章 
 */
router.post('/api/blog/create',blogController.createNewBlog);

/**
 * @description 更新文章 
 */
router.put('/api/blog/update',blogController.updateBlog);

/**
 * @description  删除文章 
 */
router.delete('/api/blog/delete/:blogOid',blogController.deleteBlog);




/**
 * @description 文章分类列表
 */
router.get('/api/blog/category/list', blogController.getCategoryList);

/**
 * @description 文章分类详情
 * @param id blogID
 */
router.get('/api/blog/category/detail/:categoryOid',blogController.getCategoryDetail);

/**
 * @description 创建文章分类 
 */
router.post('/api/blog/category/create',blogController.createNewCategory);

/**
 * @description 更新文章分类 
 */
router.put('/api/blog/category/update',blogController.updateCategory);

/**
 * @description 删除文章分类 
 */
router.delete('/api/blog/category/delete/:categoryOid',blogController.deleteCategory);

/**
 * @description 添加文章评论
 */
router.post('/api/blog/comment/add',blogController.addNewComment);

module.exports = router;