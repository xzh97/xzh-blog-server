const {getDataListCount, getDataList, getData, createData, updateData} = require('../sql/index');
const getErrorMessage = require('../common/message');
const {mapToKey, toSqlValue, mapToSqlKey, mapToSqlValue, mapToKeyValue} = require('../common/map');
const {dateFormat, pagination, checkHtmlContent} = require('../common/utils');
const uuid = require('uuid');

const blogModel = {
    /**
     * @description 文章列表数据
     * @return {hasNextPage:boolean:array:boolean，data:array}
     */
    getBlogListModel:  async (limit) => {
        let keys = ['type','blog_oid','description','read_number','comment_count','title','create_time'];
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
    },
    /**
     * @description 文章详情
     * @return Object {}
     */
    getBlogDetailModel: async (params) => {
    let fieldsStr = 'title,content,category,type,private,blog_oid,read_number,comment_count,last_updated_time';
        let data = await getData('xzh_blog',fieldsStr,'blog_oid',params.blogOID);        
        return mapToKey(data)
    },

    /**
     * @description 新增文章
     * @return {errCode,errMsg}
     */
    createNewBlogModel: async (values) => {
        values.blogOID = uuid.v1();
        values.createTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
        values.lastUpdatedTime = values.createTime;
        values.author = 'xzh';
        values.content = checkHtmlContent(values.content);
        values.description = values.content.substr(0,100)+'...';
        let sqlKeyStr = mapToSqlKey(values);
        let valueKeyStr = mapToSqlValue(values);
        let data = await createData('xzh_blog',sqlKeyStr,valueKeyStr);
        if(data.affectedRows > 0){
            return getErrorMessage('CREATE_SUCCESS');
        }
        else{
            return getErrorMessage('CREATE_FAILED');
        }
    },

    /**
     * @description 修改文章
     * @return {errCode,errMsg}
     */
    updateBlogModel: async (values) => {
        let blogOID = values.blogOID;
        values.content = checkHtmlContent(values.content);
        values.description = values.content.substr(0,100)+'...';
        let updateStr = mapToKeyValue(values);
        let data = await updateData('xzh_blog',updateStr,'blog_oid',blogOID);
        if(data.affectedRows > 0){
            return getErrorMessage('UPDATE_SUCCESS');
        }
        else{
            return getErrorMessage('UPDATE_FAILED');
        }
    },

    
}
module.exports = blogModel;
