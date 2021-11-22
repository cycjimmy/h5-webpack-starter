/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
const makeAjax = require('@cycjimmy/config-lib/cjs/browsersync/2.x/middleware/makeAjax').default;
const data = require('./data.json');

module.exports = makeAjax({
  apiName: 'getData',
  data,
  timeout: 500,
});
