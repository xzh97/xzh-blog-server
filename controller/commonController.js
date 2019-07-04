const blogModel = require('../model/blog.js');
const getErrorMessage = require('../common/message');

//todo 周末记得文件上传做完就好了
const commonController = {
    postUpload:async (ctx,next) => {
        console.log(ctx.request.files);
    },
}
module.exports = commonController;