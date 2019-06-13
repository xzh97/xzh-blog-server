/**
 *
 * @summary 通用的接口返回值
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-06-06 23:19:46 
 * Last modified  : 2019-06-13 20:43:08
 */
const errorMessageMap = {
    'CREATE_SUCCESS': '创建成功',
    'CREATE_FAILED': '创建失败',
    'UPDATE_SUCCESS': '更新成功',
    'UPDATE_FAILED': '更新失败',
    'DELETE_SUCCESS': '删除成功',
    'DELETE_FAILED': '删除失败',
}
const errorCodeMap = {
    'CREATE_SUCCESS': '10001',
    'CREATE_FAILED': '10002',
    'UPDATE_SUCCESS': '10003',
    'UPDATE_FAILED': '10004',
    'DELETE_SUCCESS': '10005',
    'DELETE_FAILED': '10006',
}

const getErrorMessage = (key)=>{
    return {
        errCode:errorCodeMap[key],
        errMsg:errorMessageMap[key],
    }
}
module.exports = getErrorMessage