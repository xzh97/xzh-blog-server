const {getDataListCount, getDataList, getData, insertData, updateData, deleteData} = require('../sql/index');
const {transform2KeyValueArr} = require('../common/utils');
const userModel = {
    
    getUserModel: async (params) => {
        delete params.password;
        delete params.type;
        let whereArr = transform2KeyValueArr(params);
        let fieldsStr = 'id,user_oid,nickname,status,slogan';
        let user = await getData('xzh_user',fieldsStr,whereArr);
        return user;
    },
    addUserModel: async (values) => {
        return await insertData('xzh_user', values).then(res => {
            if(res.affectedRows > 0){
                return getErrorMessage('CREATE_SUCCESS');
            }
            else{
                return getErrorMessage('CREATE_FAILED',res);
            }
        })
    }
}
module.exports = userModel