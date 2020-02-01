const
  ajaxMake = require('./ajax.make')
  , data = require('./data.json')
;

module.exports = ajaxMake({
  apiName: 'getData',
  data: data,
  timeout: 500,
});
