const makeAjax = require('@cycjimmy/config-lib/browsersync/2.x/middleware/makeAjax');
const data = require('./data.json');

module.exports = makeAjax({
  apiName: 'getData',
  data,
  timeout: 500,
});
