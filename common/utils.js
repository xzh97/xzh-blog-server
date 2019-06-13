/**
 * long description for the file
 *
 * @summary short description for the file
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-06-11 22:54:01 
 * Last modified  : 2019-06-13 22:56:31
 */

/**
 * long description for the file
 *
 * @summary short description for the file
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-06-11 22:53:56 
 * Last modified  : 2019-06-11 22:53:56 
 */

/**
 * @summary 常用的工具
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-06-06 23:24:26 
 * Last modified  : 2019-06-11 22:48:49
 */

//日期格式化
const dateFormat = (date, format='yyyy-MM-dd') => {
    let d = new Date(date);
    if(d.toString() === 'Invalid Date'){ // ios safari下 2019-04-04这种解析不出来
        if(typeof date === 'string'){
            date = new Date(date.replace('/\-/mg','/'))
        }
        else{
            console.log(date);
        }
    }
    let year,month,day,hour,minutes,seconds;
    year = date.getFullYear();
    month = date.getMonth() + 1;
    day = date.getDate();
    hour = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();

    let str = format;
    str = str.replace('yyyy',year)
             .replace('MM',addZero(month))
             .replace('dd',addZero(day))
             .replace('hh',addZero(hour))
             .replace('mm',addZero(minutes))
             .replace('ss',addZero(seconds))
    return str;
}
function addZero(value){
    value = value < 9 ?　`0${value}` : `${value}`;
    return value
}
/**
 * @description 分页工具
 * @param {*} total 数据总量
 * @param {*} data 查询到的本页数据
 * @param {*} size 每一页最大数据量
 * @return object
 */
const pagination = (total,data,currentPage,size) => {
    console.log(total.length,data.length,currentPage,size);
    let hasNextPage = true,hasPrevPage = true,totalLength = total.length,length = data.length;
    //无下一页
    if( length < size || totalLength <= size || ( length === size && currentPage*size === totalLength )){
        hasNextPage = false;
    }
    //无上一页
    if(currentPage === 1) hasPrevPage = false;
    return {
        hasNextPage,
        hasPrevPage,
    }
}

module.exports = {
    dateFormat,
    pagination
}
