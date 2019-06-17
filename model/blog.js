const blogSqlMethods = require('../sql/blog');
const getErrorMessage = require('../common/message');
const {mapToKey, toSqlValue, toSqlMap} = require('../common/map');
const {dateFormat, pagination} = require('../common/utils');
const uuid = require('uuid');

const blogModel = {
    /**
     * @description 文章列表数据
     * @return {hasNextPage:boolean:array:boolean，data:array}
     */
    getBlogListModel:  async (limit) => {
        let keys = ['type','blog_oid','description','read_number','comment_count','title','create_time'];
        let data = await blogSqlMethods.getBlogList('xzh_blog',keys,limit);
        let total = await blogSqlMethods.getBlogListAll('xzh_blog');
        //无下一页
        let paginationObj = pagination(total,data,limit.page,limit.size);
        let res = {
                hasNextPage: paginationObj.hasNextPage,
                hasPrevPage: paginationObj.hasPrevPage,
                totalPage:Math.ceil(total.length/limit.page),
                data: mapToKey(data)
            }
        return res
    },
    /**
     * @description 文章详情
     * @return Object {}
     */
    getBlogDetailModel: async (params) => {
        console.log(params);
        let data = await blogSqlMethods.getBlogDetail('xzh_blog',params.blogOID);        
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
        values.categroy = toSqlValue(JSON.parse(values.categroy));
        values.description = values.description || values.content.substr(0,100)+'...';
        let data = await blogSqlMethods.createNewBlog('xzh_blog',values);
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
        values.categroy = JSON.parse(values.categroy);
        values.description = values.description || values.content.substr(0,100)+'...';
        delete values.blogOID;
        let data = await blogSqlMethods.updateBlog('xzh_blog',values,blogOID);
        if(data.affectedRows > 0){
            return getErrorMessage('UPDATE_SUCCESS');
        }
        else{
            return getErrorMessage('UPDATE_FAILED');
        }
    },

    
}
module.exports = blogModel;
