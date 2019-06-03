const config = require('../config/index');
const mysql = require('mysql');

const pool = mysql.createPool(config.database); //创建连接池

let query = (sql,values) => {
    return new Promise( (resolve,reject) => {
        //建立连接
        pool.getConnections((err,connection) => {
            if(err){
                reject({errMsg:'sql出错'})
            }
            else{
                connection.query(sql,values, (err,rows) => {
                    if(err){
                        reject({errMsg:'sql出错'})
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