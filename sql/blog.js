/**
 * long description for the file
 *
 * @summary blog相关的sql
 * @author xzh xzh19971005@163.com
 * @description 先暂时这样子写吧，看之后的sql语句难度，如果比较容易的话， 就把这些方法 写成一个就好了。 主要是怕比较复杂的sql
 *
 * Created at     : 2019-06-05 21:12:13 
 * Last modified  : 2019-06-12 23:09:38
 */

const query = require('./index');
const {mapToColumn} = require('../common/map');

const getBlogList = async (table,values = {}) => {
    let str = Object.keys(values).length > 0 ? Object.keys(values).join(',')　: '*' ; 
    let sql = `select ${str} from ${table}`;
    return await query(sql,values)
}
const getBlogDetail = async (table,values = '*') => {
    let str = Object.keys(values).length > 0 ? Object.keys(values).join(',')　: '*' ; 
    let sql = `select ${str} from ${table}`;
    return await query(sql,values)
}
const createNewBlog = async (table,values) => {
    let columns = mapToColumn(values) ;
    let sql = `INSERT INTO ${table} (${columns.columnStr})
    VALUE
    (${columns.valueStr});`;
    return await query(sql,values)
}
module.exports = {
    getBlogList,
    createNewBlog
}