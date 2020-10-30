const upload = require('../common/upload.js');
  
const commonController = {
    postUpload:async (ctx,next) => {
        let files = ctx.request.files.file;
        let fileUrl = await upload(files);
        ctx.response.body = {
            fileUrl: fileUrl
        };
        next();
    },
    
}

module.exports = commonController;