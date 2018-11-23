const getDataAjax = require('../mock/api/getData.ajax.js');

module.exports = options => {
  return Object.assign({
    server: {
      // https: true,
    },
    ghostMode: false,
    // logLevel: "debug",
    middleware: [
      {
        route: "/getData",
        handle: getDataAjax(),
      },
    ],
  }, options);
};