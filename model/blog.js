const {getDataListCount, getDataList, getData, createData, updateData, deleteData} = require('../sql/index');
const getErrorMessage = require('../common/message');
const {mapToKey, mapToSqlKey, mapToSqlValue, mapToKeyValue} = require('../common/map');
const {dateFormat, pagination, removeTag} = require('../common/utils');
const uuid = require('uuid');

    /*                              博客分类                               */
    /**
     * @description 文章分类列表查询
     * @return {data:array}
     */
    const getCategoriesModel = async (limit) => {
        let keys = 'category_oid,name,create_time,count';
        let data = await getDataList('xzh_blog_category',keys,limit);
        let res = {
            data: mapToKey(data)
        }
        return res
    }
    /**
     * @description 分类详情
     * @return Object {}
     */
    const getCategoryDetailModel = async (params) => {
        let fieldsStr = 'category_oid,name,create_time,count';
        let data = await getData('xzh_blog_category',fieldsStr,'category_oid',params.blogOID);        
        return mapToKey(data)
    }

    /**
     * @description 新增分类
     * @return {errCode,errMsg}
     */
    const createNewCategoryModel = async (values) => {
        //console.log('createNewCategoryModel values',values);
        values.categoryOID = uuid.v1();
        values.createTime = values.createTime || dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
        let sqlKeyStr = mapToSqlKey(values);
        let valueKeyStr = mapToSqlValue(values);
        let data = await createData('xzh_blog_category',sqlKeyStr,valueKeyStr);
        if(data.affectedRows > 0){
            return getErrorMessage('CREATE_SUCCESS');
        }
        else{
            return getErrorMessage('CREATE_FAILED');
        }
    }

    /**
     * @description 修改分类
     * @return {errCode,errMsg}
     */
    const updateCategoryModel = async (values) => {
        let categoryOID = values.categoryOID;
        let updateStr = mapToKeyValue(values);
        let data = await updateData('xzh_blog_category',updateStr,'category_oid',categoryOID);
        if(data.affectedRows > 0){
            return getErrorMessage('UPDATE_SUCCESS');
        }
        else{
            return getErrorMessage('UPDATE_FAILED');
        }
    }

    /**
     * @description 删除分类
     * @return {errCode,errMsg}
     */
    const deleteCategoryModel = async (values) => {
        let categoryOID = values.categoryOID;
        let data = await deleteData('xzh_blog_category','category_oid',categoryOID);
        //console.log('deleteCategoryModel data',data);
        if(data.affectedRows > 0){
            return getErrorMessage('DELETE_SUCCESS');
        }
        else{
            return getErrorMessage('DELETE_FAILED');
        }
    }

/*                              博客                               */
    /**
     * @description 文章列表数据
     * @return {hasNextPage:boolean:array:boolean，data:array}
     */
    const getBlogListModel = async (limit) => {
        let keys = 'type,blog_oid,description,read_number,comment_count,title,create_time';
        let data = await getDataList('xzh_blog',keys,limit);
        let total = await getDataListCount('xzh_blog');
        //无下一页
        let paginationObj = pagination(total[0]['count(*)'],data,limit.page,limit.size);
        let res = {
                hasNextPage: paginationObj.hasNextPage,
                hasPrevPage: paginationObj.hasPrevPage,
                totalPage:paginationObj.totalPage,
                data: mapToKey(data)
            }
        return res
    }
    /**
     * @description 文章详情
     * @return Object {}
     */
    const getBlogDetailModel = async (params) => {
        let fieldsStr = 'title,content,category,type,private,blog_oid,read_number,comment_count,last_updated_time';
        let data = await getData('xzh_blog',fieldsStr,'blog_oid',params.blogOID);
        let totalCategories = await getCategoriesModel();
        data[0].category = totalCategories.data.filter(item => { return item.categoryOID === data[0].category}) || [];
        return mapToKey(data)
    }

    /**
     * @description 新增文章
     * @return {errCode,errMsg}
     */
    const createNewBlogModel = async (values) => {
        values.blogOID = uuid.v1();
        values.createTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
        values.lastUpdatedTime = values.createTime;
        values.author = 'xzh';
        values.description = removeTag(values.content);
        let sqlKeyStr = mapToSqlKey(values);
        let valueKeyStr = mapToSqlValue(values);
        let data = await createData('xzh_blog',sqlKeyStr,valueKeyStr);
        if(data.affectedRows > 0){
            return getErrorMessage('CREATE_SUCCESS');
        }
        else{
            return getErrorMessage('CREATE_FAILED');
        }
    }

    /**
     * @description 修改文章
     * @return {errCode,errMsg}
     */
    const updateBlogModel = async (values) => {
        let blogOID = values.blogOID;
        values.description = removeTag(values.content);
        let updateStr = mapToKeyValue(values);
        let data = await updateData('xzh_blog',updateStr,'blog_oid',blogOID);

        if(data.affectedRows > 0){
            return getErrorMessage('UPDATE_SUCCESS');
        }
        else{
            return getErrorMessage('UPDATE_FAILED');
        }
    }

    /**
     * @description 删除文章
     * @return {errCode,errMsg}
     */
    const deleteBlogModel = async (values) => {
        let blogOID = values.blogOID;
        let data = await deleteData('xzh_blog','blog_oid',blogOID);
        //console.log('deleteBlogModel data',data);
        if(data.affectedRows > 0){
            return getErrorMessage('DELETE_SUCCESS');
        }
        else{
            return getErrorMessage('DELETE_FAILED');
        }
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
};
