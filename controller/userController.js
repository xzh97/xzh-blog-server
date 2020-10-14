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
    logout(){},
}

module.exports = userController;