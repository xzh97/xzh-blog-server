/**
 *
 * @summary 字段映射成sql列名
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-06-12 21:36:13 
 * Last modified  : 2019-07-09 22:34:22
 */

/**
 * @description map
 */
const toSqlMap = {
    'createTime':'create_time',
    'blogOID':'blog_oid',
    'lastUpdatedTime':'last_updated_time',
    'readNumber':'read_number',
    'commentCount':'comment_count',
    'categoryOID':'category_oid',
    'commentOID':'comment_oid',
    'parentOID':'parent_oid',
}

const toKeyMap = {
    'create_time':'createTime',
    'blog_oid':'blogOID',
    'last_updated_time':'lastUpdatedTime',
    'read_number':'readNumber',
    'comment_count':'commentCount',
    'category_oid':'categoryOID',
    'comment_oid':'commentOID',
    'parent_oid':'parentOID',
}

/**
 * 
 * @param {object} values 
 * @return {string} sql表的列名字符串
 */
const mapToSqlKey = (values) => {
    let keyStr = '';
    Object.keys(values).forEach(key => {
        keyStr += `${toSqlMap[key] || key},`;
    });
    return keyStr.substr(0,keyStr.length-1)
}

/**
 * 
 * @param {object} values 
 * @return {string} sql表的值名字符串
 */
const mapToSqlValue = (values) => {
    let keys = Object.keys(values);
    let valueStr = '';
    keys.forEach(key => {
        valueStr += `'${toSqlValue(values[key])}',`;
    });
    return valueStr.substr(0,valueStr.length-1)
}

/**
 * @summary 映射函数 把查到的数据库数据中，带有 '_'的 都改为 大写字母
 * @description  'blog_oid' -----> 'blogOID'
 * @param data array
 * @return array
 */
const mapToKey = (data) => {
    data.map(item => {
        for(let key in item){
            if(toKeyMap[key]) item[toKeyMap[key]] = item[key]
            if(key.indexOf('_') > -1) delete item[key];
        }
    })
    return data;
}

/**
 * @summary 数组提取value
 * @param value
 * @return 
 */
toSqlValue = (value) => {
    let justReturn = ['string','boolean','number'];
    if(justReturn.includes(typeof value)){
        return value;
    }
    else if(Array.isArray(value)){
        if(value.length){
            let valueStr = '';
            value.forEach(elem => {
                valueStr += elem.value +',';
            });
            return valueStr.substr(0,valueStr.length-1);
        }
        return '';  
    }
    else if(typeof value === 'object' && value !== null){
        return value.value;
    }
    return '';
}

/**
 * @summary 映射函数
 * @param data array
 * @return array
 */
const mapToKeyValue = (obj) => {
    let str = '';
    for(let key in obj){
        if(key === 'page' || key === 'size' || key === 'sortBy'){
            str+=''
        }
        else{
            str += `${toSqlMap[key] || key}='${toSqlValue(obj[key])}',`
        }
    }
    
    return str.substr(0,str.length-1);
}

module.exports = {
    mapToSqlValue,
    mapToSqlKey,
    mapToKey,
    mapToKeyValue,
    toSqlValue,
    toSqlMap,
}