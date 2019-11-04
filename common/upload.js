const fs = require('fs');
const path = require('path');
let parentPath = path.resolve(__dirname, '..');
const {dateFormat} = require('../common/utils');
const upload = file => {
    if(file){
        console.log(file);
        let extensionArr = file.name.split('.');
        let extension = '.' + extensionArr[extensionArr.length -1]; //获取后缀名
        let fileName = dateFormat(new Date(),'yyyyMMdd') + parseInt(Math.random()*10000) + extension;//新的文件名

        let fileUrl = `/static/upload/${dateFormat(new Date(),'yyyy-MM-dd')}/`;
        let filePath = UploadPath(fileUrl,fileName);//新的文件路径
        console.log('upload filePath:', filePath);
        let upstream = fs.createWriteStream(filePath);
        fs.createReadStream(file.path).pipe(upstream);
        return fileUrl.substr(7) + fileName
    }
}
//判断filePath是否存在，不存在就创建一个
const UploadPath = (fileUrl,fileName) => {
    let dirPath = parentPath + fileUrl;
    console.log('UploadPath dirPath',dirPath);
    if(!fs.existsSync(dirPath)){
        fs.mkdirSync(dirPath);
        return path.join(dirPath + fileName);
    }
    else{
        return path.join(dirPath + fileName);
    }
};
module.exports = upload