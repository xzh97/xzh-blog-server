const blogModel = require('../model/blog.js');
const blogController = {
    async getBlogList(ctx){
        console.log(ctx);
        await blogModel.getBlogListModel().then(result => {
            console.log(result);
        })
    },
    getBlogDetail: async(ctx) => {
        await blogModel.getBlogDetailModel().then(result => {
            console.log(result);
        })

    }
}
module.exports = blogController;