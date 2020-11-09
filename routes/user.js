const router = require('koa-router')();
const userController = require('../controller/user');

/**
 * @description 登录
 */
router.post('/api/token', userController.getToken);

/**
 * @description 获取用户信息
 */
router.post('/api/user/detail/:userOid', userController.getUser);

/**
 * @description 新增用户
 */
router.post('/api/register', userController.addUser);

/**
 * @description 更新用户
 */
router.put('/api/user/update', userController.updateUser);

/**
 * @description 注销用户
 */
router.delete('/api/user/delete/:userOid', userController.deleteUser);



module.exports = router;

