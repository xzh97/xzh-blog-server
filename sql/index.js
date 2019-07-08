const config = require('../config/index');
const mysql = require('mysql');
const { isEmptyObj } = require('../common/utils');

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
                        reject(err)
                    }
                    else {
                        resolve(rows)
                    }
                    connection.release() //关闭连接
                })
            }
        })
    })
}

/**
 * @summary 查询数据(可分页)
 * @param {string} table 表名
 * @param {string} selectStr 表数据列
 * @param {object} limit 是否分页
 */
const getDataList = async (table, selectStr = '*', limit = {}) => {
    let _sql = '';
    if (isEmptyObj(limit)) {
        _sql = `SELECT ${selectStr} FROM ${table}`;
    }
    else {
        _sql = `SELECT ${selectStr} FROM ${table} LIMIT ${(limit.page - 1) * limit.size},${limit.size}`;
    }

    return await query(_sql);
}

/**
 * @summary 查询数据条数
 * @param {string} table 表名
 */
const getDataListCount = async (table) => {
    let _sql = `SELECT count(*) FROM ${table}`;

    return await query(_sql);
}

/**
 * @summary 查询某条数据
 * @param {string} table 表名
 * @param {string} selectStr 表数据列
 * @param {string} key 查询条件key名
 * @param {string} value 查询条件value值
 */
const getData = async (table, selectStr = '*', key, value) => {
    let _sql = `SELECT ${selectStr} FROM ${table} WHERE ${key}='${value}'`;

    return await query(_sql);
}

/**
 * @summary 新建数据
 * @param {string} table 表名
 * @param {string} keyStr 列名
 * @param {string} valueStr 列对应的数据
 */
const createData = async (table, keyStr, valueStr) => {
    let _sql = `INSERT INTO ${table} (${keyStr}) VALUE (${valueStr});`;
    return await query(_sql)
}

/**
 * @summary 更新数据
 * @param {string} table 表名
 * @param {string} keyValueStr 需要更新的数据 key=value,
 * @param {string} key 更新条件key
 * @param {string} value 更新条件value
 */
const updateData = async (table, keyValueStr, key, value) => {
    let _sql = `UPDATE ${table} SET ${keyValueStr} WHERE ${key}='${value}';`;
    return await query(_sql)
}

/**
 * @summary 删除数据
 * @param {string} table 表名
 * @param {string} key 更新条件key
 * @param {string} value 更新条件value
 */
const deleteData = async (table, key, value) => {
    let _sql = `DELETE FROM ${table} WHERE ${key}='${value}';`;
    return await query(_sql)
}
module.exports = {
    getDataList,
    getDataListCount,
    getData,
    createData,
    updateData,
    deleteData,
    query,
}