const config = require('../config/index');
const mysql = require('mysql');

const pool = mysql.createPool(config.database); //创建连接池

let query = (sql,values) => {
    console.log(sql);
    return new Promise( (resolve,reject) => {
        //建立连接
        pool.getConnection((err,connection) => {
            if(err){
                reject(err);
            }
            else{
                connection.query(sql,values, (err,rows) => {
                    if(err){
                        reject(err)
                    }
                    else{
                        resolve(rows)
                    }
                    connection.release() //关闭连接
                })
            }
        })
    } )
}
module.exports = query;