const blogModel = require('../model/blog.js');

const blogController = {
     getBlogList: async (ctx,next) => {
        let obj = ctx.params;
        obj.page = Number(obj.page);
        obj.size = Number(obj.size);
        await blogModel.getBlogListModel(obj).then(result => {
            ctx.body = result;
            next()
        })
    },
    getBlogDetail: async (ctx,next) => {
        let obj = ctx.params;
        await blogModel.getBlogDetailModel(obj).then(result => {
            ctx.response.body = result[0];
            next()
        })
    },
    createNewBlog:async (ctx,next) => {
        let obj = ctx.params;
        await blogModel.createNewBlogModel(obj).then(result => {
            ctx.response.body = result;
            next()
        })
    },
    updateBlog:async (ctx,next) => {
        let obj = ctx.params;
        console.log('blogController updateBlog obj',obj);
        await blogModel.updateBlogModel(obj).then(result => {
            ctx.response.body = result;
            next()
        })
    },
}
module.exports = blogController;