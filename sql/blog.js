/**
 * long description for the file
 *
 * @summary blog相关的sql
 * @author xzh xzh19971005@163.com
 * @description 先暂时这样子写吧，看之后的sql语句难度，如果比较容易的话， 就把这些方法 写成一个就好了。 主要是怕比较复杂的sql
 *
 * Created at     : 2019-06-05 21:12:13 
 * Last modified  : 2019-06-19 21:28:56
 */

const query = require('./index');
const {mapToColumn, mapToKeyValue} = require('../common/map');

//获取列表sql
const getBlogList = async (table,values = [],limit) => {
    let str = values.length > 0 ? Object.values(values).join(',')　: '*' ; 
    let sql = `SELECT ${str} FROM ${table} LIMIT ${(limit.page-1)*10,limit.size}`;
    return await query(sql)
}
/**
 * @description 获取${table}数据总数
 * @param {*} table 表名
 */
const getBlogListCount = async (table) => {
    let sql = `SELECT count(*) FROM ${table}`;
    return await query(sql)
}

const getBlogDetail = async (table,blogOID) => {
    let fieldsStr = 'title,content,categroy,type,private,blog_oid,read_number,comment_count,last_updated_time';
    let sql = `SELECT ${fieldsStr} FROM ${table} WHERE blog_oid='${blogOID}'`;
    return await query(sql)
}
const createNewBlog = async (table,values) => {
    let columns = mapToColumn(values) ;
    let sql = `INSERT INTO ${table} (${columns.columnStr}) VALUE (${columns.valueStr});`;
    return await query(sql,values)
}

const updateBlog = async (table,updateFields,condition) => {
    let keyValueStr = mapToKeyValue(updateFields);
    let sql = `UPDATE ${table} SET ${keyValueStr} WHERE blog_oid='${condition}';`;
    return await query(sql)
}

module.exports = {
    getBlogList,
    getBlogListAll,
    createNewBlog,
    getBlogDetail,
    updateBlog
}