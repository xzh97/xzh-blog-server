/**
 * long description for the file
 *
 * @summary short description for the file
 * @author xzh xzh19971005@163.com
 *
 * Created at     : 2019-06-11 22:54:01 
 * Last modified  : 2019-06-12 21:41:54
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

module.exports = {
    dateFormat
}
