const router = require('koa-router')();
const koaBody = require('koa-body');
const commonController = require('../controller/common.js');

/**
 * @description 上传图片
 */
router.post('/api/upload', koaBody(),commonController.postUpload);

module.exports = router;