const getDataAjax = require('../mock/api/getData.ajax');

module.exports = options => {
  return Object.assign({
    server: {},
    ghostMode: false,
    middleware: [
      {
        route: '/getData',
        handle: getDataAjax(),
      },
    ],
  }, options);
};
