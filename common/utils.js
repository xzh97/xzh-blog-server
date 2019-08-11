/**
 * @description 工具库
 * @author xzh
 *
 * Created at     : 2019-06-06 23:24:26 
 * Last modified  : 2019-08-08 22:51:14
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
    year = d.getFullYear();
    month = d.getMonth() + 1;
    day = d.getDate();
    hour = d.getHours();
    minutes = d.getMinutes();
    seconds = d.getSeconds();

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
 * @param {Array} total 数据总量
 * @param {Array} data 查询到的本页数据
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
 * @param {Boolean} toUnderLine 要替换的字符
 * @param {String} char 要替换的字符
 * @description 原对象 下划线转驼峰或者驼峰转下划线  默认驼峰转下划线
 * @return 处理过的key
 */
const replaceUnderlineOrCamel = (obj = {}, toUnderLine = true, char='_') => {
    let arr = Object.keys(obj).filter(item => ~item.indexOf(char));
    const methodMap = {
        toUnderline:str2Underline,
        toStr:underline2Str
    }
    const method = methodMap[toUnderLine ? 'toUnderline' : 'toStr']
    arr.map(item => {
        const val = obj[item];
        const key = method(item);
        obj[key] = val;
        delete obj[item];
    })
    return obj;
}

/**
 * @param {Object} obj 要处理的对象
 * @param {String} char 要替换的字符
 * @description 对象驼峰转下划线 obj:{a:1,b:2},['a,b'],[1,2]
 * @return 返回处理后的keys和对应的vals
 * @return {Array} keys
 * @return {Array} vals
 */
const filterCamel = (obj = {},char = '_') => {
    let arr = Object.keys(obj),keys = [], vals = [];
    arr.forEach(item => {
        keys.push(str2Underline(item))
        vals.push(obj[item]);
    });

    return {
        keys,
        vals
    };
};

/**
 * @param {String} obj 要处理的对象
 * @param {Boolean} flag 确定where条件 （or，and，） 默认 and todo 暂时先不写这个 看下先
 * @description 转换成where子句的keyValue数组
 * @return 返回处理后的数组 ex:'{a:1,b:2} --> [{key:'a',value:'1'},{key:'b',value:'2'}]'
 * @return {Array} result
 */
const transform2KeyValueArr = (obj = {}, flag = true) => {
    let arr = Object.keys(obj),result = [];
    arr.forEach(key => {
        let item = {
            key: str2Underline(key),
            value: obj[key]
        }
        result.push(item)
    });

    return result;
};

/**
 * @param {Array} arr 要处理的数组
 * @param char 连接符号
 * @description 转换成key=value的形式
 * @return 返回处理后的数组 ex:'[{key:'a',value:'1'} --> a=1'
 * @return {String}
 */
const transform2KeyValueStr = (arr = [], char = ',') => {
    let result = [];
    arr.forEach(item => {
        let valueStr = typeof item.value === 'number' ? item.value : `'${item.value}'`
        let str = `${item.key}=${valueStr}`;
        result.push(str)
    });

    return result.join(char);
};

/**
 * @description async + await包一层try catch 
 * @param {Function} fn 
 * @param  {...any} params 
 */
const awaitHandle = async (fn,...params) => {
    try {
        return await fn(...params)
    } catch (error) {
        console.log(error);
    }
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
    filterCamel,
    transform2KeyValueArr,
    transform2KeyValueStr,
}
