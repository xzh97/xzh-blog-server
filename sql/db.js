/**
 * @summary 此文件用于创建对应的sql表，
 * @desc 适用于项目初次运行创建sql表
 * */
const {query} = require('./index');

//todo  晚上回去记得把dataGrip的表 复制过来。。 不然两端不能一起开发QAQ
const sql = ``

const createTable = sql => {
    return query(sql)
}

createTable(sql);