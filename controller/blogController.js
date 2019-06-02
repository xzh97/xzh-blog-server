const blogModel = require('../model/blog.js');
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
    }
}
module.exports = blogController;