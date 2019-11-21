const {getDataListCount, getDataList, getData, insertData, updateData, deleteData} = require('../sql/index');
const getErrorMessage = require('../common/message');
const { transform2KeyValueArr, replaceUnderlineOrCamel} = require('../common/utils');

/**
 * 
 * @description 此文件用来调用sql， 拿到数据之后做一次封装
 * @desc 文件说明 除插入数据的方法，其余参数皆传keyValueArr。
 * @desc blogModel.insertMethod(values = {})
 * @desc blogModel.notInsertMethod(values = [{key:'',value:''}])
 */

/*                              博客分类                               */
/**
 * @param {Array} params
 * @param {Object} limit {page:number,size:number} or null
 * @description 文章分类列表查询
 * @return {Array}
 */
const getCategoriesModel = async (params,limit) => {
    let keys = 'category_oid,name,create_time,count';
    return await getDataList('xzh_blog_category',keys,params,limit).then(res => {
        return res.map(row => replaceUnderlineOrCamel(row,false));
    })
};

/**
 * @param {Array} params
 * @description 分类详情
 * @return Object {}
 */
const getCategoryDetailModel = async (params) => {
    let fieldsStr = 'category_oid,name,create_time,count';
    return await getData('xzh_blog_category', fieldsStr, params).then(res => {
        return res.map(row => replaceUnderlineOrCamel(row,false));
    })
};

/**
 * @description 新增分类
 * @return {errCode,errMsg}
 */
const createNewCategoryModel = async (values) => {
    return await insertData('xzh_blog_category', values).then(res => {
        if(res.affectedRows > 0){
            return getErrorMessage('CREATE_SUCCESS');
        }
        else{
            return getErrorMessage('CREATE_FAILED',res);
        }
    })
};

/**
 * @param {Array} updateArr
 * @param {Array} whereArr
 * @description 修改分类
 * @return {errCode,errMsg}
 */
const updateCategoryModel = async (updateArr,whereArr) => {
    return await updateData('xzh_blog_category',updateArr,whereArr).then(res => {
        if(res.affectedRows > 0){
            return getErrorMessage('UPDATE_SUCCESS');
        }
        else{
            return getErrorMessage('UPDATE_FAILED',res);
        }
    })
};

/**
 * @param {Array} params
 * @description 删除分类
 * @return {errCode,errMsg}
 */
const deleteCategoryModel = async (params) => {
    return await deleteData('xzh_blog_category',params).then(res => {
        if(res.affectedRows > 0){
                return getErrorMessage('DELETE_SUCCESS');
        }
        else{
            return getErrorMessage('DELETE_FAILED',res);
        }
    })
};

/*                              博客                               */
/**
 * @param {Array} params
 * @param {Object} limit
 * @description 文章列表数据
 * @return []
 */
const getBlogListModel = async (params,limit) => {
    params.push({key:'status', value:1})
    let keys = 'type,blog_oid,description,read_number,category_oid,comment_count,title,create_time';
    return await Promise.all([getDataList('xzh_blog',keys,params,limit), getDataListCount('xzh_blog','blog_oid',params)]).then(res => {
        let [data,total] = res;
         data.map(row => replaceUnderlineOrCamel(row,false)).reverse();
         total = total[0]['count(blog_oid)'];
         return {data,total};
    })
};

/**
 * @param {Array} params
 * @description 文章详情
 * @return {Array}
 */
const getBlogDetailModel = async (params) => {
    let fieldsStr = 'title,content,category_oid,type,private,blog_oid,read_number,comment_count,last_updated_time,status';
    return await Promise.all([getData('xzh_blog', fieldsStr, params), getBlogComments(params)]).then(res => {
        let [data, commentsList] = res;
        data.map(item => {
            return replaceUnderlineOrCamel(item,false);
        });
        commentsList.map(item => {
            return replaceUnderlineOrCamel(item,false);
        });
        return [data, commentsList];
    })
};

/**
 * @param {Object} values
 * @description 新增文章
 * @return {errCode,errMsg}
 */
const createNewBlogModel = async (values) => {
    //先查询 category count
    let category = [{ key:'category_oid',value:values.categoryOid }];
    let categoryCount = await getCategoryDetailModel(category);
    console.log('createNewBlogModel count',categoryCount);

    //在插入新数据 以及 category.count ++;
    let count = [{key:'count', value:categoryCount[0].count + 1}];

    return await Promise.all([insertData('xzh_blog', values),updateCategoryModel(count,category)]).then(res => {
        //console.log(res);
        if(res[0].affectedRows && res[1].errCode === 10003){
            return getErrorMessage('CREATE_SUCCESS');
        }
        else{
            return getErrorMessage('CREATE_FAILED',res);
        }
    })
}

/**
 * @param {Array} updateArr 需要更新的数据
 * @param {Array} whereArr sql语句的where子句
 * @description 修改文章
 * @return {errCode,errMsg}
 */
const updateBlogModel = async (updateArr,whereArr) => {
    console.log('updateBlogModel updateArr',updateArr);
    let category1Oid;  //更新前分类Oid
    let category2Oid;  //更新后分类Oid

    //获取更新前博客数据
    let [beforeUpdateBlogData] = await getBlogDetailModel(whereArr);
    let blogCategories = await getCategoriesModel([],null);
    console.log('updateBlogModel beforeUpdateBlogData',beforeUpdateBlogData);
    //console.log('updateBlogModel blogCategories',blogCategories);

    //找到两个分类oid 并赋值
    category1Oid = beforeUpdateBlogData[0]['categoryOid'];
    category2Oid = updateArr.find(item => item.key === 'category_oid').value;

    let updateBlogData = await updateData('xzh_blog',updateArr,whereArr);
    console.log('updateBlogModel updateBlogData',updateBlogData);

    //切换了博客分类,需要更新分类的信息
    let res1, res2;
    if(category1Oid !== category2Oid){
        console.log('blogCategories',category1Oid,category2Oid);
        let category1Count = blogCategories.find(category => category['categoryOid'] === category1Oid)['count'];
        let category2Count = blogCategories.find(category => category['categoryOid'] === category2Oid)['count'];
        let category1UpdateArr = [
            {
                key: 'category_oid',
                value: category1Oid
            },
            {
                key: 'count',
                value: category1Count - 1
            },
        ];

        let category2UpdateArr = [
            {
                key: 'category_oid',
                value: category2Oid
            },
            {
                key: 'count',
                value: category2Count + 1
            },
        ];
        res1 = await updateCategoryModel([category1UpdateArr[1]],[category1UpdateArr[0]]);
        res2 = await updateCategoryModel([category2UpdateArr[1]],[category2UpdateArr[0]])
        console.log(res1,res2);
    }


    if(updateBlogData.affectedRows){
        return getErrorMessage('UPDATE_SUCCESS');
    }
    else{
        return getErrorMessage('UPDATE_FAILED',res);
    }
};

/**
 * @param {Array} params
 * @description 删除文章
 * @return {errCode,errMsg}
 */
const deleteBlogModel = async (params) => {
    try {
        let updateArr = [{key:'status',value:2}];
        //更新删除的博客分类
        let blogData = await getBlogDetailModel(params);
        let category_oid = blogData[0].category_oid;
        let category = await getCategoryDetailModel([{key:'category_oid',value:category_oid}]);
        category[0].count --;
        let categoryKeyValueArr = transform2KeyValueArr(category[0]);
        
        //console.log(category_oid);
        let updateDatas = await updateCategoryModel(categoryKeyValueArr,categoryKeyValueArr.filter(item => item.key === 'category_oid'));
        //console.log('updateData',updateDatas)
        let data = await updateBlogModel(updateArr,params);
        if(updateDatas.errCode === 10003 && data.errCode === 10003){
            return getErrorMessage('DELETE_SUCCESS');
        }
        else{
            return getErrorMessage('DELETE_FAILED',res);
        }
    } catch (err) {
        console.log(err);
        return err;
    }
};

/**
 * @param {Object} values
 * @description 添加博客评论
 * @return data
 */
const addNewCommentModel = async (values) => {
    return await insertData('xzh_blog_comments',values).then(res => {
        if(res.affectedRows > 0){
            return getErrorMessage('CREATE_SUCCESS');
        }
        else{
            return getErrorMessage('CREATE_FAILED',res);
        }
    })
};

/**
 * @param {Array} params
 * @description 获取博客评论列表
 * @return data
 */
const getBlogComments = async (params) => {
    let selectStr = 'comment_oid,parent_oid,content,author,create_time,reply_comment_author';
    return await getData('xzh_blog_comments',selectStr,params);
};


module.exports = {
    getCategoriesModel,
    getCategoryDetailModel,
    createNewCategoryModel,
    updateCategoryModel,
    deleteCategoryModel,

    getBlogListModel,
    getBlogDetailModel,
    createNewBlogModel,
    updateBlogModel,
    deleteBlogModel,

    getBlogComments,
    addNewCommentModel
};
