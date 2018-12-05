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
  return () => {
    apiName = '[' + apiName + ']';

    return (req, res, next) => {
      let remoteAddress = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress
      ;

      // Set Header
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Content-Type", "application/json;charset=UTF-8");

      if (req.method === 'GET') {
        console.log(
          apiName + ' Receive a require' + '\n' +
          apiName + ' -----------------' + '\n' +
          apiName + ' Method: ' + req.method + '\n' +
          apiName + ' RemoteAddress: ' + remoteAddress + '\n' +
          apiName + ' Data: ' + req.query + '\n'
        );

        setTimeout(() => {
          res.end(JSON.stringify(data));
          next();
        }, timeout);
      }

      // Receive the browser data
      req.on('data', e => {
        console.log(
          apiName + ' Receive a require' + '\n' +
          apiName + ' -----------------' + '\n' +
          apiName + ' Method: ' + req.method + '\n' +
          apiName + ' RemoteAddress: ' + remoteAddress + '\n' +
          apiName + ' Data: ' + e + '\n'
        );

        setTimeout(() => {
          res.end(JSON.stringify(data));
          next();
        }, timeout);
      });

      req.on('err', err => {
        console.log(
          apiName + ' Error: ' + err + '\n'
        );

        res.end('Error:' + err);
        next();
      });
    };
  };
};