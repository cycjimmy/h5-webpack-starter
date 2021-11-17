const getDataAjax = require('../mock/api/getData.ajax');

module.exports = (options) => ({
  server: {},
  ghostMode: false,
  middleware: [
    {
      route: '/getData',
      handle: getDataAjax(),
    },
  ],
  ...options,
});
