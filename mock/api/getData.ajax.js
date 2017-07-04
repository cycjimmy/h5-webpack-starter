/**
 * Created by cyc on 2016/11/24.
 */

const
  ajaxMake = require('./ajax.make')
  , data = require('./data.json')
  ;

module.exports = ajaxMake({
  apiName: 'getData',
  data: data,
  timeout: 500,
});
