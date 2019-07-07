const upload = require('../common/upload.js');
const getErrorMessage = require('../common/message');

//todo 周末记得文件上传做完就好了
const commonController = {
    postUpload:async (ctx,next) => {
        let files = ctx.request.files.file;
        let fileUrl = upload(files);
        ctx.body = {
            fileUrl: fileUrl
        }
    },
}
module.exports = commonController;