const blogModel = require('../model/blog.js');
const getErrorMessage = require('../common/message');

const blogController = {
     getBlogList: async (ctx,next) => {
        let obj = ctx.params;
        obj.page = Number(obj.page);
        obj.size = Number(obj.size);
        try {
            await blogModel.getBlogListModel(obj).then(result => {
                ctx.body = result;
                next()
            })
        }catch{
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
    getBlogDetail: async (ctx,next) => {
        let obj = ctx.params;
        try{
            await blogModel.getBlogDetailModel(obj).then(result => {
                ctx.response.body = result[0];
                next()
            })
        }catch{
            return getErrorMessage('SYSTEM_ERROR')
        }  
    },
    createNewBlog:async (ctx,next) => {
        let obj = ctx.params;
        try{
            await blogModel.createNewBlogModel(obj).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch{
            return getErrorMessage('SYSTEM_ERROR')
        } 
    },
    updateBlog:async (ctx,next) => {
        let obj = ctx.params;
        console.log('blogController updateBlog obj',obj);
        try{
            await blogModel.updateBlogModel(obj).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch{
            return getErrorMessage('SYSTEM_ERROR')
        }
    },

    // 博客分类
    getCategoryList: async (ctx,next) => {
        let obj = ctx.params;
        try {
            await blogModel.getCategoriesModel(obj).then(result => {
                ctx.body = result;
                next()
            })
        }catch{
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
    getCategoryDetail: async (ctx,next) => {
        let obj = ctx.params;
        try{
            await blogModel.getCategoryDetailModel(obj).then(result => {
                ctx.response.body = result[0];
                next()
            })
        }catch{
            return getErrorMessage('SYSTEM_ERROR')
        }  
    },
    createNewCategory:async (ctx,next) => {
        let obj = ctx.params;
        try{
            await blogModel.createNewCategoryModel(obj).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch{
            return getErrorMessage('SYSTEM_ERROR')
        } 
    },
    updateCategory:async (ctx,next) => {
        let obj = ctx.params;
        console.log('blogController updateCategory obj',obj);
        try{
            await blogModel.updateCategoryModel(obj).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch{
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
}
module.exports = blogController;