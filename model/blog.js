const blogSqlMethods = require('../sql/blog');
const getErrorMessage = require('../common/message');
const {mapToKey} = require('../common/map');
const {dateFormat, pagination} = require('../common/utils');
const uuid = require('uuid');

const blogModel = {
    /**
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
     * @description 暂时先不写， 先写新增去了 不然么得数据
     * @return {hasNextPage:boolean:array:boolean，data:array}
     */
    getBlogDetailModel: async (params) => {
        console.log(params);
        let data = await blogSqlMethods.getBlogDetail('xzh_blog',params.blogOID);
        return mapToKey(data);
    },
    createNewBlogModel: async (values) => {
        values.blogOID = uuid.v1();
        values.createTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
        values.lastUpdatedTime = values.createTime;
        values.categroy = JSON.parse(values.categroy);
        values.private = Number(values.private) || 0;
        values.author = 'xzh';
        values.description = values.description || values.content.substr(0,100)+'...';
        let data = await blogSqlMethods.createNewBlog('xzh_blog',values);
        if(data.affectedRows > 0){
            return getErrorMessage('CREATE_SUCCESS');
        }
        else{
            return getErrorMessage('CREATE_FAILED');
        }
    },
}
module.exports = blogModel;
