const upload = require('../common/upload.js');

const commonController = {
    postUpload:async (ctx,next) => {
        let file = ctx.request.files.file;
        let { type, name} = ctx.params;
        let fileUrl = await upload({file, type, name});
        ctx.body = {
            fileUrl: fileUrl
        }
    },
}
module.exports = commonController;