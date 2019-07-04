/**
 *
 * @summary 通用的接口返回值
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-06-06 23:19:46 
 * Last modified  : 2019-07-04 22:47:46
 */
const errorMessageMap = {
    'CREATE_SUCCESS': '创建成功',
    'CREATE_FAILED': '创建失败',
    'UPDATE_SUCCESS': '更新成功',
    'UPDATE_FAILED': '更新失败',
    'DELETE_SUCCESS': '删除成功',
    'DELETE_FAILED': '删除失败',
    'SYSTEM_ERROR':'系统错误',
    'UPLOAD_SUCCESS':'上传成功',
    'UPLOAD_ERROR':'上传失败',
}
const errorCodeMap = {
    'CREATE_SUCCESS': '10001',
    'CREATE_FAILED': '10002',
    'UPDATE_SUCCESS': '10003',
    'UPDATE_FAILED': '10004',
    'DELETE_SUCCESS': '10005',
    'DELETE_FAILED': '10006',
    'SYSTEM_ERROR': '10007',
    'UPLOAD_SUCCESS':'10008',
    'UPLOAD_ERROR':'10009',
}

const getErrorMessage = (key)=>{
    return {
        errCode:errorCodeMap[key],
        errMsg:errorMessageMap[key],
    }
}
module.exports = getErrorMessage