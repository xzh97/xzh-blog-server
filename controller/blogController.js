const blogModel = require('../model/blog.js');
const getErrorMessage = require('../common/message');

const blogController = {
     getBlogList: async (ctx,next) => {
        let obj = ctx.params;
        obj.page = Number(obj.page);
        obj.size = Number(obj.size);
        //console.log('getBlogList params',obj);
        try {
            await blogModel.getBlogListModel(obj).then(result => {
                console.log('getBlogList',result)
                ctx.body = result;
                next()
            })
        }catch(err){
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
        }catch(err){
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
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        } 
    },
    updateBlog:async (ctx,next) => {
        let obj = ctx.params;
        //('blogController updateBlog obj',obj);
        try{
            await blogModel.updateBlogModel(obj).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
    deleteBlog:async (ctx,next) => {
        let obj = ctx.params;
        console.log('blogController deleteBlog obj',obj);
        try{
            await blogModel.deleteBlogModel(obj).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }
    },

    // 博客分类
    getCategoryList: async (ctx,next) => {
        let obj = ctx.params;
        try {
            await blogModel.getCategoriesModel(obj).then(result => {
                //console.log('getCategoryList',result)
                ctx.body = result;
                next()
            })
        }catch(err){
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
        }catch(err){
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
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        } 
    },
    updateCategory:async (ctx,next) => {
        let obj = ctx.params;
        //('blogController updateCategory obj',obj);
        if(obj.createTime) delete obj.createTime;
        try{
            await blogModel.updateCategoryModel(obj).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
    deleteCategory:async (ctx,next) => {
        let obj = ctx.params;
       // console.log('blogController deleteCategory obj',obj);
        try{
            await blogModel.deleteCategoryModel(obj).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }
    },

    addNewComment:async (ctx,next) => {
        let obj = ctx.params;
        try{
            await blogModel.addNewCommentModel(obj).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
}
module.exports = blogController;