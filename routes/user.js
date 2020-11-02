const router = require('koa-router')();
const userController = require('../controller/user');

/**
 * @description 登录
 */
router.post('/api/token', userController.getToken);

/**
 * @description 获取用户信息
 */
router.post('/api/user/:userOid', userController.getUser);

module.exports = router;

