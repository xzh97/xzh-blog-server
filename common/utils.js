/**
 * @summary 工具库
 * @author xzh
 *
 * Created at     : 2019-06-06 23:24:26 
 * Last modified  : 2019-07-01 21:45:30
 */

/**
 * @description 日期格式化
 * @param {} date 
 * @param {*} format 
 */
const dateFormat = (date, format='yyyy-MM-dd') => {
    let d = new Date(date);
    if(d.toString() === 'Invalid Date'){ // ios safari下 2019-04-04这种解析不出来
        if(typeof date === 'string'){
            date = new Date(date.replace('/\-/mg','/'))
        }
        else{
            //console.log(date);
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
 * @param {array} total 数据总量
 * @param {array} data 查询到的本页数据
 * @param {number} currentPage 当前页码
 * @param {number} size 每一页最大数据量
 * @return object
 */
const pagination = (total,data,currentPage,size) => {
    //console.log('pagination params',total,data.length,currentPage,size);
    let hasNextPage = true,
        hasPrevPage = true,
        length = data.length,
        totalPage = Math.ceil(total/size);
    //无下一页
    if( length < size || total <= size || ( length === size && currentPage*size === total )){
        hasNextPage = false;
    }
    //无上一页
    if(currentPage === 1) hasPrevPage = false;
    return {
        hasNextPage,
        hasPrevPage,
        totalPage,
    }
}

/** 
 * @summary 判断是否是空对象
 * @param {object} 判断对象
 * @return {boolean}
*/
const isEmptyObj = (obj) => {
    for(let key in obj){
        return false;
    }
    return true;
}

/** 
 * @summary 判断是否是空数组
 * @param {object} 判断数组
 * @return {boolean}
*/
const isEmptyArray = (arr) => {
    if(Array.isArray(arr) && !arr.length) return true
    return false;
}

/** 
 * @summary 去掉blog内容里的标签 
 * @param {string} str
 * @return {string}
*/
const removeTag = (str) => {
    console.log(str);
    return str.replace(/<[^>]+>/g, "").substr(0,100);
}
module.exports = {
    dateFormat,
    pagination,
    isEmptyObj,
    removeTag,
    isEmptyArray
}
