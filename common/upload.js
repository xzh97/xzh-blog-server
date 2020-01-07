const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
let parentPath = path.resolve(__dirname, '..');
const {dateFormat} = require('../common/utils');

const upload = ({file, type, name}) => {
    if(file){
        console.log(file);
        let extensionArr = file.name.split('.');
        let extension = '.' + extensionArr[extensionArr.length -1]; //获取后缀名
        let fileName = name + extension || dateFormat(new Date(),'yyyyMMdd') + parseInt(Math.random()*10000) + extension;//新的文件名

        let fileUrl = `/static/upload/${dateFormat(new Date(),'yyyy-MM-dd')}/`;
        let filePath = UploadPath(fileUrl,fileName);//新的文件路径
        console.log('upload filePath:', filePath);
        let upstream = fs.createWriteStream(filePath);
        fs.createReadStream(file.path).pipe(upstream);
        if(type){
            let hostingPath = path.resolve(__dirname,`../../../Images/`); // 图床目录
            let cmd = `cp ${filePath} ${hostingPath}`; //复制图片到图床目录
            runCommand(cmd)
        }
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

const runCommand = cmd => {
    return new Promise((resolve,reject) => {
        childProcess.exec(cmd,(error, stdout, stderr) => {
            if (error) {
                console.error(`执行命令出错：${cmd}`);
                console.error(error);
                reject(error);
            }
            else{
                console.log(`stdout: ${stdout}`);
                console.log(`stderr: ${stderr}`);
                resolve()
            }
        })
    })
}
module.exports = upload