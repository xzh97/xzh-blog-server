/**
 *
 * @summary 字段映射成sql列名
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-06-12 21:36:13 
 * Last modified  : 2019-06-12 23:14:52
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
 * @param values object
 * @return object string
 */
const mapToColumn = (values) => {
    let keys = Object.keys(values);
    let columnStr = '',valueStr = '';
    keys.forEach(key => {
        columnStr += `${toSqlMap[key] || key},`;
        valueStr += `"${toSqlValue(values[key])}",`;
    });
    columnStr = columnStr.substr(0,columnStr.length-1);
    valueStr = valueStr.substr(0,valueStr.length-1);
    return {
        columnStr,
        valueStr
    }
}

/**
 * @summary 映射函数
 * @param data array
 * @return array
 */
const mapToKey = (data) => {
    data.map(item => {
        for(let key in item){
            item[toKeyMap[key]] = item[key]
            if(key.indexOf('_') > -1) delete item[key];
        }
    })
    return data;
}

/**
 * @param value
 * @return 
 */
toSqlValue = (value) => {
    let justReturn = ['string','boolean','number'];
    console.log(value);
    console.log(Array.isArray(value));
    if(justReturn.includes(typeof value)){
        return value;
    }
    else if(Array.isArray(value)){
        let valueStr = '';
        value.forEach(elem => {
            valueStr += elem.value +',';
        });
        console.log(valueStr.substr(0,valueStr.length-1));
        return valueStr.substr(0,valueStr.length-1);
    }
    else if(typeof value === 'object' && value !== null){
        return value.value;
    }
    return '';
}

const columnToKey = (values) => {
    let keys = Object.keys(values);
    let columnStr = '',valueStr = '';
    keys.forEach(key => {
        columnStr += `${toSqlMap[key] || key},`;
        valueStr += `"${toSqlValue(values[key])}",`;
    });
    columnStr = columnStr.substr(0,columnStr.length-1);
    valueStr = valueStr.substr(0,valueStr.length-1);
    return {
        columnStr,
        valueStr
    }
}

module.exports = {
    mapToColumn,
    mapToKey,
}