const router = require('koa-router')();
const blogController = require('../controller/blogController');

router.get('/api/blog/list', blogController.getBlogList());
router.get('/api/blog/detail/:id',blogController.getBlogDetail());
module.exports = router;