const {getDataListCount, getDataList, getData, insertData, updateData, deleteData} = require('../sql/index');
const {transform2KeyValueArr} = require('../common/utils');
const userModel = {
    
    getUserModel: async (params) => {
        console.log(params);
        delete params.password;
        delete params.type;
        let whereArr = transform2KeyValueArr(params);
        let user = await getData('xzh_user','*',whereArr);
        return user;
    }
}
module.exports = userModel