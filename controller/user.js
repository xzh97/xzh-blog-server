const jwt = require('jsonwebtoken');
const uuid = require('uuid');

const {checkPostData, dateFormat, transform2KeyValueArr} = require('../common/utils');
const {decode} = require('../common/encrypt');

const userModel = require('../model/user');
const userController = {

    getToken: async (ctx, next) => {
        let params = ctx.params;
        params.password = decode(params.password, 1);
        delete params.type;
        let userInfo = await userModel.getUserModel(params);
        console.log(userInfo[0]);
        if(!userInfo.length){
            ctx.status = 400;
            ctx.body = {
                errCode: 'ACCOUNT_ERROR',
                errMsg: '登录失败，账号/密码不正确'
            }
        }
        else{
            let jwtPayload = {
                sub: '',
                userOID: userInfo.length && userInfo[0].userOID,
                userId: userInfo.length && userInfo[0].id,
                
            };
            let jwtOptions = {
                expiresIn: '1h',
            }
            const token = jwt.sign(jwtPayload, 'xzh19971005', jwtOptions)
            
            ctx.body = {
                token
            }
        }
        next();
    },
    
    getUser: async (ctx,next) => {
        let params = ctx.params;
        console.log(params);
        let result = await userModel.getUserModel(params);
        ctx.body = result[0]
        next();
    },
    
    addUser: async(ctx, next) => {
        let values = ctx.params;
        values.password = decode(values.password, values.type);
        values.userOid = uuid.v1();
        values.createTime = values.loginTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');

        delete values.type;

        const randomNickName = () => {
            const surnameArr = [
                '赵', '钱', '孙', '李', '周', '吴', '郑', '王', '冯',
                '陈', '褚', '卫', '蒋', '沈', '韩', '杨', '朱', '秦',
                '尤', '许', '何', '吕', '施', '张', '孔', '曹', '严',
                '华', '金', '魏', '陶', '姜', '戚', '谢', '邹', '喻',
                '柏', '水', '窦', '章', '云', '苏', '潘', '葛', '奚',
                '范', '彭', '郎', '鲁', '韦', '昌', '马', '苗', '凤',
                '花', '方', '俞', '任', '袁', '柳', '酆', '鲍', '史',
                '唐', '费', '廉', '岑', '薛', '雷', '贺', '倪', '汤',
                '滕', '殷', '罗', '毕', '郝', '邬', '安', '常', '乐',
                '于', '时', '傅', '皮', '卞', '齐', '康', '伍', '余',
                '元', '卜', '顾', '孟', '平', '黄', '和', '穆', '萧', '尹'
            ];
            // 狗剩狗蛋翠花秀琴秀花美丽翠花铁柱铁牛旺财富贵
            const nameArr = [
                '狗剩', '狗蛋',
                '翠花', '秀琴',
                '秀花', '美丽',
                '翠花', '铁柱',
                '铁牛', '旺财',
                '二狗', '富贵',
            ]

            const getRandomNumber = length => Math.floor(Math.random() * length);

            return surnameArr[getRandomNumber(surnameArr.length)] + nameArr[getRandomNumber(nameArr.length)]
            
        }
        values.nickname = randomNickName();
 
        await userModel.addUserModel(checkPostData(values)).then(result => {
            console.log(result);
            ctx.body = result;
        })
        next()
        
    },

    updateUser: async (ctx, next) => {
        let params = ctx.params;
        params = checkPostData(params);
        let whereArr = transform2KeyValueArr({
            userOid: params.userOid
        });
        let updateArr = transform2KeyValueArr(params);
        await userModel.updateUserModel(updateArr, whereArr).then(res => {
            if(res.code === 'ER_PARSE_ERROR'){
                ctx.status = 500;
            }
            ctx.body = res;
        })
        next();
    },

    deleteUser: async (ctx, next) => {
        let params = ctx.params;
        let whereArr = transform2KeyValueArr(params);
        await userModel.deleteUserModel(whereArr).then(result => {
            ctx.body = result;
        })
        next()
    },
}

module.exports = userController;