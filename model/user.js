const {getDataListCount, getDataList, getData, insertData, updateData, deleteData} = require('../sql/index');
const {transform2KeyValueArr} = require('../common/utils');
const getErrorMessage = require('../common/message');

const getUserModel = async (params) => {
    let whereArr = transform2KeyValueArr(params);
    let fieldsStr = 'id,user_oid,nickname,status,slogan';
    let user = await getData('xzh_user', fieldsStr, whereArr);
    return user;
}

const addUserModel = async (values) => {
    let accountResult = await getUserModel({account: values.account});
    console.log('校验是否有相同用户名存在', accountResult);
    if(Array.isArray(accountResult) && accountResult.length){
        // 该用户名已经被注册了
        return getErrorMessage('ER_ACCOUNT_REPEAT');
    }
    return await insertData('xzh_user', values).then(res => {
        if(res.affectedRows > 0){
            return getErrorMessage('CREATE_SUCCESS');
        }
        else{
            return getErrorMessage('CREATE_FAILED',res);
        }
    })
}

const updateUserModel = async (updateArr,whereArr) => {
    return await updateData('xzh_user',updateArr,whereArr).then(res => {
        if(res.affectedRows > 0){
            return getErrorMessage('UPDATE_SUCCESS');
        }
        else{
            return getErrorMessage('UPDATE_FAILED',res);
        }
    })
};

const deleteUserModel = async (updateArr,whereArr) => {
    return await updateData('xzh_user',updateArr,whereArr).then(res => {
        if(res.affectedRows > 0){
            return getErrorMessage('UPDATE_SUCCESS');
        }
        else{
            return getErrorMessage('UPDATE_FAILED',res);
        }
    })
};

module.exports = {
    getUserModel,
    addUserModel,
    updateUserModel
}