const upload = require('../common/upload.js');

const commonController = {
    postUpload:async (ctx,next) => {
        let files = ctx.request.files.file;
        let fileUrl = await upload(files);
        ctx.body = {
            fileUrl: fileUrl
        }
    },
}
module.exports = commonController;