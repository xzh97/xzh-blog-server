const config = require('../config/index');
const mysql = require('mysql');
const { errorHandler, transform2KeyValueStr, filterCamel, } = require('../common/utils');

const pool = mysql.createPool(config.database); //创建连接池

const query = (sql, values) => {
    console.log(sql);
    return new Promise((resolve, reject) => {
        //建立连接
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err);
            }
            else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        console.log('query err',err);
                        reject(errorHandler(err))
                    }
                    else {
                        resolve(rows)
                    }
                    
                })
                connection.release() //关闭连接
            }
        })
    })
}

/**
 * @summary 查询数据(可分页)
 * @param {String} table 表名
 * @param {String} selectStr 表数据列
 * @param {Array} params keyvalue数组
 * @param {object} limit 分页 {page:number,size:number} or null
 */
const getDataList = async (table, selectStr, params, limit) => {
    let _sql = `SELECT ${selectStr} FROM ${table} `;
    let whereStr = transform2KeyValueStr(params,' AND ');
    if(whereStr.length){
        _sql += `WHERE ${whereStr} `
    }
    if (limit) {
        _sql += `LIMIT ${(limit.page - 1) * limit.size},${limit.size}`;
    }
    return await query(_sql);
}

/**
 * @summary 查询数据条数
 * @param {string} table 表名
 * @param {string} key 按照这个去计算
 * @param {Array} params keyvalue数组
 */
const getDataListCount = async (table,key = '*',params) => {
    let _sql = `SELECT count(${key}) FROM ${table} `;
    let whereStr = transform2KeyValueStr(params,' AND ');
    if(whereStr.length){
        _sql += `WHERE ${whereStr} `
    }

    return await query(_sql);
}

/**
 * @summary 查询一条数据
 * @param {string} table 表名
 * @param {string} selectStr 表数据列   ex:'name,title,content'
 * @param {Array} params 查询条件key名  ex:[key:'name',value:'xzh']
 */
const getData = async (table, selectStr = '*', params) => {
    let where = transform2KeyValueStr(params, ' AND ');
    let _sql = `SELECT ${selectStr} FROM ${table} WHERE ${where}`;

    return await query(_sql);
}

/**
 * @summary 插入一条数据
 * @param {string} table 表名
 * @param {Object} values 插入的数据
 */
const insertData = async (table, values) => {
    const {keys, vals} = filterCamel(values);
    const keyStr = keys.join(',');
    const valueStr = keys.map(item => '?').join(',');
    let _sql = `INSERT INTO ${table} (${keyStr}) VALUE (${valueStr});`;
    return await query(_sql,[...vals])
}

/**
 * @summary 更新某条数据
 * @param {string} table 表名
 * @param {Array} updateArr 需要更新的数据 [{key:'a',value:'1'}],
 * @param {Array} whereArr where子句条件 [{key:'a',value:'1'}]
 */
const updateData = async (table, updateArr, whereArr) => {
    let updateStr = transform2KeyValueStr(updateArr);
    let whereStr = transform2KeyValueStr(whereArr);
    let _sql = `UPDATE ${table} SET ${updateStr} WHERE ${whereStr};`;
    return await query(_sql)
}

/**
 * @summary 删除数据（物理删除）
 * @param {string} table 表名
 * @param {Array} whereArr where子句条件
 */
const deleteData = async (table, whereArr) => {
    let whereStr = transform2KeyValueStr(whereArr);
    let _sql = `DELETE FROM ${table} WHERE ${whereStr};`;
    return await query(_sql)
}
module.exports = {
    getDataList,
    getDataListCount,
    getData,
    insertData,
    updateData,
    deleteData,
    query,
}