const {getDataListCount, getDataList, getData, insertData, updateData, deleteData} = require('../sql/index');
const getErrorMessage = require('../common/message');
const {dateFormat, filterCamel, transform2KeyValue, transform2Where} = require('../common/utils');
const uuid = require('uuid');


/*                              博客分类                               */
/**
 * @param {Array} params
 * @param {Object} limit {page:number,size:number} or null
 * @description 文章分类列表查询
 * @return {Array}
 */
const getCategoriesModel = async (params,limit) => {
    let keys = 'category_oid,name,create_time,count';
    let whereStr = transform2KeyValue(params);
    return await getDataList('xzh_blog_category',keys,whereStr,limit);
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
    return await Promise.all([getData('xzh_blog', fieldsStr, params), getCategoriesModel(), getBlogComments(params)]).then(response => {
        //console.log(response);
        return response;
    })
}

/**
 * @param {Object} values
 * @param {Array} 
 * @description 新增文章
 * @return {errCode,errMsg}
 */
const createNewBlogModel = async (values) => {
    const {keys, vals} = filterCamel(values);
    let category = {
        key: 'category_oid',
        value: values.category
    }
    // todo 为什么感觉这么写  感觉好捞啊 看下要怎么改善
    return await Promise.all([insertData('xzh_blog', keys, vals), getData('xzh_blog_category','count',[category])]).then(async res => {
        console.log(res);
        let countObj = {
            key: 'count',
            value: ++ res[1][0].count
        }
        let countStr = transform2KeyValue([countObj]);
        let categoryWhereStr = transform2KeyValue([category]);
        let data = await updateData('xzh_blog_category',countStr,categoryWhereStr);
        if(res[0].affectedRows && data.affectedRows){
            return getErrorMessage('CREATE_SUCCESS');
        }
        else{
            return getErrorMessage('CREATE_FAILED');
        }
    }).catch(err => {
        return err
    })
       
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
    console.log(params);

    let categoryCount = 0;
    //更新前的博客分类
    let beforeUpdateObj = await getData('xzh_blog_category', 'category_oid,count', params)[0];

    //更新后的博客分类
    let afterUpdateObj = updateArr.filter(item => item.key === 'category')[0];

    if(beforeUpdateObj['category_oid'] !== afterUpdateObj.value){
        categoryCount = afterUpdateObj.count - 1;
        let updateCategoryStr = transform2KeyValue([{key:'count',value:categoryCount}]);
        let updateCategoryWhereStr = transform2KeyValue([afterUpdateObj]);
        let updateResult = await updateData('xzh_blog_category',updateCategoryStr,updateCategoryWhereStr);
    }

    let data = await updateData('xzh_blog',updateStr,whereStr);

    console.log(updateResult, data)


    if(updateResult.affectedRows && data.affectedRows){
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
 * @param {Object} params
 * @description 添加博客评论
 * @return data
 */
const addNewCommentModel = async (params) => {
    console.log('addNewCommentModel params',params);
    const {keys, vals} = filterCamel(params);
    let data = await insertData('xzh_blog_comments',keys,vals);
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
