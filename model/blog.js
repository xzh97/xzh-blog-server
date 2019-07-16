const {getDataListCount, getDataList, getData, insertData, updateData, deleteData} = require('../sql/index');
const getErrorMessage = require('../common/message');
const {filterCamel} = require('../common/utils');
const {mapToKey, mapToSqlKey, mapToSqlValue, mapToKeyValue} = require('../common/map');
const {dateFormat, pagination, transform2KeyValue} = require('../common/utils');
const uuid = require('uuid');


/*                              博客分类                               */
/**
 * @description 文章分类列表查询
 * @return {Array}
 */
const getCategoriesModel = async (limit) => {
    let keys = 'category_oid,name,create_time,count';
    return await getDataList('xzh_blog_category',keys,limit);
}
/**
 * @param {Array} params
 * @description 分类详情
 * @return Object {}
 */
const getCategoryDetailModel = async (params) => {
    let fieldsStr = 'category_oid,name,create_time,count';
    return await getData('xzh_blog_category', fieldsStr, params);
}

/**
 * @description 新增分类
 * @return {errCode,errMsg}
 */
const createNewCategoryModel = async (values) => {
    const {keys, vals} = filterCamel(values);
    let data = await insertData('xzh_blog_category',keys,vals);
    if(data.affectedRows > 0){
        return getErrorMessage('CREATE_SUCCESS');
    }
    else{
        return getErrorMessage('CREATE_FAILED');
    }
}

/**
 * @param {Array} updateArr
 * @param {Array} params
 * @description 修改分类
 * @return {errCode,errMsg}
 */
const updateCategoryModel = async (updateArr,params) => {
    let updateStr = transform2KeyValue(updateArr);
    let whereStr = transform2KeyValue(params);
    let data = await updateData('xzh_blog_category',updateStr,whereStr);
    if(data.affectedRows > 0){
        return getErrorMessage('UPDATE_SUCCESS');
    }
    else{
        return getErrorMessage('UPDATE_FAILED');
    }
}

/**
 * @param {Array} params
 * @description 删除分类
 * @return {errCode,errMsg}
 */
const deleteCategoryModel = async (params) => {
    let whereStr = transform2KeyValue(params);
    let data = await deleteData('xzh_blog_category',whereStr);
    if(data.affectedRows > 0){
        return getErrorMessage('DELETE_SUCCESS');
    }
    else{
        return getErrorMessage('DELETE_FAILED');
    }
}

/*                              博客                               */
/**
 * @param {Array} params
 * @param {Object} limit
 * @description 文章列表数据
 * @return {hasNextPage:boolean:array:boolean，data:array}
 */
const getBlogListModel = async (params,limit) => {
    try {
        let keys = 'type,blog_oid,description,read_number,comment_count,title,create_time';
        let whereStr = transform2KeyValue(params);
        return Promise.all([await getDataList('xzh_blog',keys,whereStr,limit),await getDataListCount('xzh_blog')]).then(res => {
            return res;
        })
    } catch (error) {
        return error
    }

}
/**
 * @param {Array} params
 * @description 文章详情
 * @return {Array}
 */
const getBlogDetailModel = async (params) => {
    let fieldsStr = 'title,content,category,type,private,blog_oid,read_number,comment_count,last_updated_time';
    return Promise.all([await getData('xzh_blog', fieldsStr, params),await getCategoriesModel(),await getBlogComments(params)]).then(response => {
        //console.log(response);
        return response;
    })
    /*let data = await getData('xzh_blog', fieldsStr, params);
    let totalCategories = await getCategoriesModel();
    let commentsList = await getBlogComments(params);
    console.log(data);
    console.log(totalCategories);
    console.log(commentsList);
    data[0].category = totalCategories.data.filter(item => { return item.categoryOid === data[0].category}) || [];
    data[0].comments = commentsList;
    return mapToKey(data)*/
}

/**
 * @param {Object} values
 * @description 新增文章
 * @return {errCode,errMsg}
 */
const createNewBlogModel = async (values) => {
    const {keys, vals} = filterCamel(values);
    let data = await insertData('xzh_blog', keys, vals);
    if(data.affectedRows > 0){
        return getErrorMessage('CREATE_SUCCESS');
    }
    else{
        return getErrorMessage('CREATE_FAILED');
    }
}

/**
 * @param {Array} updateArr
 * @param {Array} params
 * @description 修改文章
 * @return {errCode,errMsg}
 */
const updateBlogModel = async (updateArr,params) => {
    let updateStr = transform2KeyValue(updateArr);
    let whereStr = transform2KeyValue(params);
    let data = await updateData('xzh_blog',updateStr,whereStr);

    if(data.affectedRows > 0){
        return getErrorMessage('UPDATE_SUCCESS');
    }
    else{
        return getErrorMessage('UPDATE_FAILED');
    }
}

/**
 * @param {Array} params
 * @description 删除文章
 * @return {errCode,errMsg}
 */
const deleteBlogModel = async (params) => {
    let whereStr = transform2KeyValue(params);
    let data = await deleteData('xzh_blog',whereStr);
    if(data.affectedRows > 0){
        return getErrorMessage('DELETE_SUCCESS');
    }
    else{
        return getErrorMessage('DELETE_FAILED');
    }
}

/**
 * @description 添加博客评论
 * @return data
 */
const addNewCommentModel = async (params) => {
    console.log('addNewCommentModel params',params);
    params.commentOid = uuid.v1();
    params.createTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
    let sqlKeyStr = mapToSqlKey(params);
    let valueKeyStr = mapToSqlValue(params);
    let data = await insertData('xzh_blog_comments',sqlKeyStr,valueKeyStr);
    console.log(data);

    if(data.affectedRows > 0){
        return getErrorMessage('CREATE_SUCCESS');
    }
    else{
        return getErrorMessage('CREATE_FAILED');
    }
}

/**
 * @param {Array} params
 * @description 获取博客评论列表
 * @return data
 */
const getBlogComments = async (params) => {
    let selectStr = 'comment_oid,parent_oid,content,author,create_time';
    return await getData('xzh_blog_comments',selectStr,params);
}


module.exports = {
    getCategoriesModel,
    getCategoryDetailModel,
    createNewCategoryModel,
    updateCategoryModel,
    deleteCategoryModel,

    getBlogListModel,
    getBlogDetailModel,
    createNewBlogModel,
    updateBlogModel,
    deleteBlogModel,

    getBlogComments,
    addNewCommentModel
};
