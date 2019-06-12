const blogModel = require('../model/blog.js');
const {dateFormat} = require('../common/utils');

const uuid = require('uuid');
const blogController = {
     getBlogList: async (ctx,next) => {
        await blogModel.getBlogListModel().then(result => {
            ctx.body = result;
            next()
        })
    },
    getBlogDetail: async (ctx,next) => {
        await blogModel.getBlogDetailModel().then(result => {
            ctx.response.body = result;
            next()
        })
    },
    createNewBlog:async (ctx,next) => {
        let obj = ctx.params;
        obj.blogOID = uuid.v1();
        obj.createTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
        obj.lastUpdatedTime = obj.createTime;
        obj.categroy = JSON.parse(obj.categroy);
        obj.private = Number(obj.private) || 0;
        obj.author = 'xzh';
        obj.description = obj.content.substr(0,100)+'...';
        await blogModel.createNewBlog(obj).then(result => {
            ctx.response.body = result;
            next()
        })
    },
}
module.exports = blogController;