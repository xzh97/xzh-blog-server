const blogSqlMethods = require('../sql/blog');
const getErrorMessage = require('../common/message');
const {mapToKey} = require('../common/map');

const blogModel = {
    /**
     * @return {hasNextPage:boolean:array:boolean，data:array}
     */
    getBlogListModel:  async () => {
            
        let data = await blogSqlMethods.getBlogList('xzh_blog');
        console.log(data);
        let res = {
                hasNextPage:true,
                hasPrevPage:false,
                data:mapToKey(data)
            }
        return res
    },
    /**
     * @description 暂时先不写， 先写新增去了 不然么得数据
     * @return {hasNextPage:boolean:array:boolean，data:array}
     */
    getBlogDetailModel: async () => {
        return new Promise( (resolve,reject) => {
            let res = {
                id:100001,
                title:'如何编写一个ajax？(1)',
                blogType:'original',
                description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                lastUpdatedTime:1502275412000,
                visitor: 262,
                commentCount:0,
                comments:[],
            };
            setTimeout(()=>{
                resolve(res) 
            },500)
        } )
    },
    createNewBlog: async (values) => {
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
