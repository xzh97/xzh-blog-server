/**
 *
 * @summary 字段映射成sql列名
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-06-12 21:36:13 
 * Last modified  : 2019-06-17 23:24:39
 */

/**
 * @description map
 */
const toSqlMap = {
    createTime:'create_time',
    blogOID:'blog_oid',
    lastUpdatedTime:'last_updated_time',
    readNumber:'read_number',
    commentCount:'comment_count',
}

const toKeyMap = {
    'create_time':'createTime',
    'blog_oid':'blogOID',
    'last_updated_time':'lastUpdatedTime',
    'read_number':'readNumber',
    'comment_count':'commentCount',
}

/**
 * @summary 映射函数 
 * @description ex: INSERT INTO ${table} (${columns.columnStr}) VALUE (${columns.valueStr});
 * @param values object
 * @return object {数据库列名,数据库值}
 */
const mapToColumn = (values) => {
    let keys = Object.keys(values);
    let columnStr = '',valueStr = '';
    keys.forEach(key => {
        columnStr += `${toSqlMap[key] || key},`;
        valueStr += `'${toSqlValue(values[key])}',`;
    });
    columnStr = columnStr.substr(0,columnStr.length-1);
    valueStr = valueStr.substr(0,valueStr.length-1);
    return {
        columnStr,
        valueStr
    }
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
        let valueStr = '';
        value.forEach(elem => {
            valueStr += elem.value +',';
        });
        return valueStr.substr(0,valueStr.length-1);
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
        str += `${toSqlMap[key] || key}='${toSqlValue(obj[key])}',`
    }
    
    return str.substr(0,str.length-1);
}

module.exports = {
    mapToColumn,
    mapToKey,
    mapToKeyValue,
    toSqlValue,
    toSqlMap,
}