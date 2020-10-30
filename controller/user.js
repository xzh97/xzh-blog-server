const {checkPostData} = require('../common/utils');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user');
const userController = {
    
    getUser: async (ctx,next) => {
        let params = ctx.params;
        console.log(params);
        // let result = await getUserInfo();
        ctx.body = {
            nickname: '夕至',
            slogan: '何须仰望他人，自己亦是风景！',
            createTime: '2020-10-11 14:30:00',
            userOID: '1273bcd0-d7ec-11ea-82f3-dd24538a5141'
        }
    },
    addUser: async(ctx, next) => {
        try{

            let values = ctx.params;
            values.userOid = uuid.v1();
            values.createTime = values.loginTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
            values.nickname = '夕至';

            await userModel.addUserModel(checkPostData(values)).then(result => {
                console.log(result);
                ctx.response.body = result;
                next()
            })
        }catch(e){
            console.error(e);
            return getErrorMessage('SYSTEM_ERROR')
        } 
    },

    getToken: async (ctx, next) => {
        let params = ctx.params;
        
        let userInfo = await userModel.getUserModel(params);
        console.log(userInfo[0]);
        if(!userInfo.length){
            ctx.status = 400;
            ctx.response.body = {
                errCode: 'ACCOUNT_ERROR',
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

module.exports = userController;