const blogController = {
    getBlogList(){
        return 'this is getBlogList method'
    },
    getBlogDetail: async(ctx) => {
        let id = '1001';
        return `this is getBlogDetail method, id = ${id}`
    }
}
module.exports = blogController;