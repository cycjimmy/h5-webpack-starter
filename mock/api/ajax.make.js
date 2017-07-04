/**
 * Created by cyc on 2017/2/8.
 */

/**
 * mock ajax api
 * @param apiName
 * @param data
 * @param timeout
 * @returns {function(*, *=, *=)}
 */
module.exports = ({
  apiName,
  data = null,
  timeout = 200,
}) => {
  return ()=>{
    apiName = '['+apiName+']';

    return (req, res, next) => {

      let remoteAddress = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
      ;

      //设置响应头文件
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json;charset=UTF-8");

      //收到浏览器数据
      req.on('data', e => {

        //打印信息
        console.log(
          apiName + ' Receive a require' + '\n' +
          apiName + ' -----------------' + '\n' +
          apiName + ' Method: ' + req.method + '\n' +
          apiName + ' RemoteAddress: ' + remoteAddress + '\n' +
          apiName + ' Data: ' + e + '\n'
        );

        //延迟执行
        setTimeout(() => {
          res.end(JSON.stringify(data));
          next();
        }, timeout);
      });

      //错误处理
      req.on('err', err => {
        //打印错误
        console.log(
          apiName + ' Error: ' + err + '\n'
        );

        res.end('Error:' + err);
        next();
      });
    };
  };
};