const blogModel = require('../model/blog.js');
const getErrorMessage = require('../common/message');
const {dateFormat, pagination, removeTag, replaceUnderlineOrCamel, transform2KeyValueArr} = require('../common/utils');
const uuid = require('uuid');

const blogController = {
    getBlogList: async (ctx,next) => {
        let obj = ctx.params;
        console.log(obj);

        const limit = obj.page || obj.size ? {
            page: Number(obj.page) || 1,
            size: Number(obj.size) || 10
        } : null;
        const sortByVal = obj.sortBy;
        const arr = ['page','size','sortBy'];
        //不作为where子句的条件，没有这个列
        Object.keys(obj).forEach(item => {
            if(arr.includes(item)){
                delete obj[item];
            }
        })

        const whereArr = transform2KeyValueArr(obj);
        try {
            await blogModel.getBlogListModel(whereArr,limit).then(result => {
                let data = result[0].map(item => {
                    return replaceUnderlineOrCamel(item,false)
                }).reverse();
                const total = result[1];

                data = sortBlogList(data,sortByVal);

                //无下一页
                let {hasNextPage, hasPrevPage, totalPage } = pagination(total[0]['count(*)'],data,limit.page,limit.size);

                function sortBlogList (data,sortBy = 'default') { //default 更新时间降序， ascending 更新时间升序 时间越早越前排, pageviews 浏览量
                    console.log(data,sortBy);
                    if(sortBy === 'ascending'){
                        data = data.reverse();
                    }else if(sortBy === 'pageviews'){
                        data = data.sort(function(a,b){
                            return a.readNumber <　b.readNumber ? 1 : -1
                        })
                    }
                    console.log(data);
                    return data
                }

                ctx.body = {
                    hasNextPage,
                    hasPrevPage,
                    totalPage,
                    data
                };
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
    getBlogDetail: async (ctx,next) => {
        let obj = ctx.params;
        let whereArr = transform2KeyValueArr(obj)
        try{
            await blogModel.getBlogDetailModel(whereArr).then(result => {
                //console.log(result);
                let [data,totalCategories,commentsList] = result;
                data.map(item => {
                    return replaceUnderlineOrCamel(item,false);
                });
                totalCategories.map(item => {
                    return replaceUnderlineOrCamel(item,false);
                });
                commentsList.map(item => {
                    return replaceUnderlineOrCamel(item,false);
                });
               
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
                data[0].category = totalCategories.filter(item => { return item.categoryOid === data[0].category});
                data[0].comments = assemblyComments(commentsList);
                //console.log(data);
                ctx.response.body = data[0];
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }  
    },
    createNewBlog:async (ctx,next) => {
        let values = ctx.params;
        values.blogOid = uuid.v1();
        values.createTime = values.lastUpdatedTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
        values.author = 'xzh';
        values.description = removeTag(values.content);
        try{
            await blogModel.createNewBlogModel(values).then(result => {
                console.log(result);
                ctx.response.body = result;
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        } 
    },
    updateBlog:async (ctx,next) => {
        let obj = ctx.params;
        console.log(obj);
            obj.description = removeTag(obj.content);
            obj.lastUpdatedTime = dateFormat(obj.lastUpdatedTime,'yyyy-MM-dd hh:mm:ss');
        let whereArr = transform2KeyValueArr({
            blogOid: obj.blogOid
        });
        let updateArr = transform2KeyValueArr(obj);
        try{
            await blogModel.updateBlogModel(updateArr,whereArr).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
    deleteBlog:async (ctx,next) => {
        let obj = ctx.params;
        let whereArr = transform2KeyValueArr(obj);
        console.log('blogController deleteBlog obj',obj);
        try{
            await blogModel.deleteBlogModel(whereArr).then(result => {
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
        console.log(obj);
        const limit = obj.page || obj.size ? {
            page: Number(obj.page) || 1,
            size: Number(obj.size) || 10
        } : null;
        const whereArr = transform2KeyValueArr(obj);
        try {
            await blogModel.getCategoriesModel(whereArr,limit).then(result => {
                result.map(item => {
                    return replaceUnderlineOrCamel(item,false)
                })
                ctx.body = result;
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
    getCategoryDetail: async (ctx,next) => {
        let obj = ctx.params;
        let where = transform2KeyValueArr(obj);
        try{
            await blogModel.getCategoryDetailModel(where).then(result => {
                result.map(item => {
                    return replaceUnderlineOrCamel(item,false);
                });
                ctx.response.body = result[0];
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }  
    },
    createNewCategory:async (ctx,next) => {
        let obj = ctx.params;
        obj.categoryOid = uuid.v1();
        obj.createTime = obj.createTime || dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
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
        let whereObj = {
            categoryOid: obj.categoryOid
        }
        let whereArr = transform2KeyValueArr(whereObj);
        let updateArr = transform2KeyValueArr(obj);
        try{
            await blogModel.updateCategoryModel(updateArr,whereArr).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }
    },
    deleteCategory:async (ctx,next) => {
        let obj = ctx.params;
        let whereArr = transform2KeyValueArr(obj);
       // console.log('blogController deleteCategory obj',obj);
        try{
            await blogModel.deleteCategoryModel(whereArr).then(result => {
                ctx.response.body = result;
                next()
            })
        }catch(err){
            return getErrorMessage('SYSTEM_ERROR')
        }
    },

    addNewComment:async (ctx,next) => {
        let obj = ctx.params;
        obj.commentOid = uuid.v1();
        obj.createTime = dateFormat(new Date(),'yyyy-MM-dd hh:mm:ss');
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