//config.defrault.js
//该keys的值是任意的字符串，它是cookie加密的盐
exports.keys = "fgsgfdssdfggfdddgds";
exports.multipart = {
  mode: 'file',//文件上传
  fileSize: 999999,//设置上传文件大小的最大值，单位是字节
};
exports.security = {
  csrf: {
    enable: false,//使能post
    ignoreJSON: true//使能文件上传能成功
  }
};
//跨域配置
exports.cors = {
  origin: '*',
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  credentials: true
};

//修改默认端口号7001为80
exports.cluster = {
  listen: {
    port: 7001
  }
};
//数据库mysql配置
exports.mysql = {
  client: {
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',//数据库密码,要根据情况修改
    database: 'youpin',//数据库名字，要根据情况修改
  },
};