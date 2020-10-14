const router = require('koa-router')();
const koaBody = require('koa-body');
const commonController = require('../controller/commonController.js');

/**
 * @description 上传图片
 */
router.post('/api/upload', koaBody(),commonController.postUpload);

/**
 * @description 上传图片
 */
router.post('/api/token', commonController.getToken);

module.exports = router;