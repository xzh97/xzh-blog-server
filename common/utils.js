/**
 * @description 工具库
 * @author xzh
 *
 * Created at     : 2019-06-06 23:24:26 
 * Last modified  : 2019-07-15 22:45:58
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
 * @description 判断是否是空对象
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
 * @description 判断是否是空数组
 * @param {object} 判断数组
 * @return {boolean}
*/
const isEmptyArray = (arr) => {
    if(Array.isArray(arr) && !arr.length) return true
    return false;
}

/** 
 * @description 去掉blog内容里的标签 
 * @param {string} str
 * @return {string}
*/
const removeTag = (str) => {
    console.log(str);
    return str.replace(/<[^>]+>/g, "").substr(0,100);
}

/**
 * @param {String} val 要处理的key
 * @param {String} char 要替换的字符
 * @description 驼峰转下划线
 * @return 处理过的key
 */
const str2Underline = (val,char='_') => {
    return val.replace(/([A-Z])/g,`${char}$1`).toLowerCase();
}

/**
 * @param {String} val 要处理的key
 * @description 下划线转驼峰
 * @return 处理过的key
 */
const underline2Str = (val) => {
    return val.replace(/\_(\w)/g, (all, letter) => {
        return letter.toUpperCase()
      })
}

/**
 * @param {String} obj 要处理的对象
 * @param {String} char 要替换的字符
 * @param {Boolean} toUnderLine 要替换的字符
 * @description 原对象 下划线转驼峰或者驼峰转下划线  默认驼峰转下划线
 * @return 处理过的key
 */
const replaceUnderlineOrCamel = (obj = {}, char='_', toUnderLine = true) => {
    let arr = Object.keys(obj).filter(item => ~item.indexOf(char));
    let methodMap = {
        toUnderline:str2Underline,
        toStr:underline2Str
    }
    let method = methodMap[toUnderLine ? 'toUnderline' : 'toStr']
    arr.map(item => {
        const val = obj[item];
        const key = method(item);
        obj[key] = val;
        delete obj[item];
    })
    return obj;
}


module.exports = {
    dateFormat,
    pagination,
    isEmptyObj,
    removeTag,
    isEmptyArray,
    str2Underline,
    underline2Str,
    replaceUnderlineOrCamel,
}
