const blogModel = require('../model/blog.js');
const getErrorMessage = require('../common/message');
const {
    dateFormat,
    getPagination,
    removeTag,
    transform2KeyValueArr,
    checkPostData,
    isEmptyObj
} = require('../common/utils');
const uuid = require('uuid');

const blogController = {
    getBlogList: async (ctx,next) => {
        try {
            let obj = ctx.params;
            console.log(obj);

            //page & size 包装
            const limit = !isEmptyObj(ctx.query) ? {
                page: Number(obj.page) || 1,
                size: Number(obj.size) || 12
            } : null;

            delete obj['page'];
            delete obj['size'];

            const whereArr = transform2KeyValueArr(obj);
            await blogModel.getBlogListModel(whereArr,limit).then(result => {
                console.log('controller getBlogList',result);
                let {data,total} = result;

                //无下一页
                let {hasNextPage, hasPrevPage, totalPage } = getPagination(total,data,limit.page,limit.size);

                ctx.response.body = {
                    hasNextPage,
                    hasPrevPage,
                    totalPage,
                    data
                };
                next()
            })
        }catch (e) {
            console.error(e);
        }
    },
    getBlogDetail: async (ctx,next) => {
        try {
            let obj = ctx.params;
            let whereArr = transform2KeyValueArr(obj)
            await blogModel.getBlogDetailModel(whereArr).then(result => {
                //console.log(result);
                let [data, commentsList] = result;
                function assemblyComments(data){
                    let result = [],children = [];
                    result = data.filter(item => !item.parentOid);
                    children = data.filter(item => item.parentOid);
                    console.log('assemblyComments',children);
                    result.map(item => {
                        item.children = children.filter(item2 => item2.parentOid === item.commentOid) || [];
                    })
                    return result;
                }
                data[0].comments = assemblyComments(commentsList);
                //console.log(data);
                ctx.response.body = data[0];
                next()
            })
        }catch (e) {
            console.error(e);
        }
    },
    createNewBlog:async (ctx,next) => {
        try{

            let values = ctx.params;
            values.blogOid = uuid.v1();
            values.createTime = values.lastUpdatedTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
            values.author = 'xzh';
            values.description = removeTag(values.content);
            await blogModel.createNewBlogModel(checkPostData(values)).then(result => {
                console.log(result);
                ctx.response.body = result;
                next()
            })
        }catch(e){
            console.error(e);
            return getErrorMessage('SYSTEM_ERROR')
        } 
    },
    updateBlog:async (ctx,next) => {
        try{
            let obj = ctx.params;
            console.log('blogController updateBlog params',obj);
            obj.description = removeTag(obj.content);
            obj.lastUpdatedTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
            obj = checkPostData(obj);
            let whereArr = transform2KeyValueArr({
                blogOid: obj.blogOid
            });
            let updateArr = transform2KeyValueArr(obj);
            await blogModel.updateBlogModel(updateArr,whereArr).then(result => {
                ctx.response.body = result;
                if(result.code === 'ER_PARSE_ERROR'){
                    ctx.response.status = 500;
                }
                next()
            })
        }catch(e){
            console.error(e);
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
    deleteBlog:async (ctx,next) => {
        try{
            let obj = ctx.params;
            let whereArr = transform2KeyValueArr(obj);
            console.log('blogController deleteBlog params',obj);
            await blogModel.deleteBlogModel(whereArr).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch(e){
            console.error(e);
            return getErrorMessage('SYSTEM_ERROR')
        }
    },

    // 博客分类
    getCategoryList: async (ctx,next) => {
        try {
            let obj = ctx.params;
            console.log(obj);
            const limit = !isEmptyObj(ctx.query) ? {
                page: Number(obj.page) || 1,
                size: Number(obj.size) || 10
            } : null;
            const whereArr = transform2KeyValueArr(obj);
            await blogModel.getCategoriesModel(whereArr,limit).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch (e) {
            console.error(e);
        }

    },
    getCategoryDetail: async (ctx,next) => {
        try {
            let obj = ctx.params;
            let where = transform2KeyValueArr(obj);
            await blogModel.getCategoryDetailModel(where).then(result => {
                ctx.response.body = result[0];
                next()
            })
        }catch (e) {
            console.error(e);
        }

    },
    createNewCategory:async (ctx,next) => {
        try {
            let obj = ctx.params;
            obj.categoryOid = uuid.v1();
            obj.createTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
            await blogModel.createNewCategoryModel(obj).then(result => {
                ctx.response.body = result;
                result.errCode === 10010 && (ctx.response.status = 500);
                next()
            })
        }catch (e) {
            console.error(e);
        }

    },
    updateCategory:async (ctx,next) => {
        try {
            let obj = ctx.params;
            let whereObj = {
                categoryOid: obj.categoryOid
            }
            let whereArr = transform2KeyValueArr(whereObj);
            let updateArr = transform2KeyValueArr(obj);
            await blogModel.updateCategoryModel(updateArr,whereArr).then(result => {
                ctx.response.body = result;
                result.errCode === 10010 && (ctx.response.status = 500);
                next()
            })
        }catch (e) {
            console.error(e);
        }

    },
    deleteCategory:async (ctx,next) => {
        try {
            let obj = ctx.params;
            let whereArr = transform2KeyValueArr(obj);
            console.log('blogController deleteCategory',obj);
            await blogModel.deleteCategoryModel(whereArr).then(result => {
                ctx.response.body = result;
                result.errCode === 10010 && (ctx.response.status = 500);
                next()
            })
        }catch (e) {
            console.error(e);
        }

    },

    addNewComment:async (ctx,next) => {
        try {
            let obj = ctx.params;
            obj.commentOid = uuid.v1();
            obj.createTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
            await blogModel.addNewCommentModel(obj).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch (e) {
            console.error(e);
        }

    },
}
module.exports = blogController;