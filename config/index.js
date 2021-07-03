const devConfig = require('./dev');
// const prodConfig = require('./prod');
console.log('current env: ', process.env.NODE_ENV);
let currentConfig = process.env.NODE_ENV === 'dev' ? devConfig : prodConfig
module.exports = currentConfig