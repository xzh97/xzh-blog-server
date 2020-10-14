const router = require('koa-router')();
const userController = require('../controller/userController');

router.post('/api/user', userController.getUser);

module.exports = router;

