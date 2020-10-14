const upload = require('../common/upload.js');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
  
const commonController = {
    postUpload:async (ctx,next) => {
        let files = ctx.request.files.file;
        let fileUrl = await upload(files);
        ctx.response.body = {
            fileUrl: fileUrl
        };
        next();
    },

    getToken: async (ctx, next) => {
        let params = ctx.params;
        
        let userInfo = await userModel.getUserModel(params);
        console.log(userInfo[0]);
        if(!userInfo.length){
            ctx.response.body = {
                errMsg: '登录失败，账号/密码不正确'
            }
        }
        else{
            let jwtPayload = {
                sub: '',
                userOID: userInfo.length && userInfo[0].userOID,
                
            };
            let jwtOptions = {
                expiresIn: '1h',
            }
            const token = jwt.sign(jwtPayload, 'xzh19971005', jwtOptions)
            
            ctx.response.body = {
                token
            }
        }
        next();
    }
}
module.exports = commonController;