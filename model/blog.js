const blogModel = {
    getBlogListModel:  () => {    
        return new Promise( (resolve,reject) => {
            let data = [
                {
                    id:100001,
                    title:'如何编写一个ajax？(1)',
                    blogType:'original',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502275412000,
                    visitor: 262,
                    commentCount:0,
                    comments:[],
                },
                {
                    id:100002,
                    title:'如何编写一个ajax？(2)',
                    blogType:'reproduced',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502475412000,
                    visitor: 22,
                    commentCount:0,
                    comments:[],
                },
                {
                    id:100003,
                    title:'如何编写一个ajax？(1)',
                    blogType:'original',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502275412000,
                    visitor: 262,
                    commentCount:0,
                    comments:[],
                },
                {
                    id:100004,
                    title:'如何编写一个ajax？(2)',
                    blogType:'reproduced',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502475412000,
                    visitor: 22,
                    commentCount:0,
                    comments:[],
                },
                {
                    id:100005,
                    title:'如何编写一个ajax？(1)',
                    blogType:'original',
                    description:'那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？那么我们如何才能编写一个普遍使用的ajax呢？',
                    lastUpdatedTime:1502275412000,
                    visitor: 262,
                    commentCount:0,
                    comments:[],
                },
            ]
            let res = {
                hasNextPage:true,
                hasPrevPage:false,
                data:data
            }
            setTimeout(()=>{
                resolve(res) 
            },500)
        } )
    },
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
    }
}
module.exports = blogModel;
