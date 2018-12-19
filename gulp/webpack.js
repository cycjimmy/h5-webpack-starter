const shell = require('gulp-shell');

exports.packDev = shell.task([
  'cross-env NODE_ENV=development webpack --config webpack/webpack.dev.config.js --display-modules --display-reasons --display-error-details --watch --color'
]);

exports.packBuild = shell.task([
  'cross-env NODE_ENV=production webpack --config webpack/webpack.build.config.js --progress --display-modules --display-reasons --display-error-details --optimize-minimize --color'
]);

exports.packBuildWatch = shell.task([
  'cross-env NODE_ENV=production webpack --config webpack/webpack.build.config.js --progress --display-modules --display-reasons --display-error-details --optimize-minimize --color --watch'
]);

exports.packBuildTestServerWatch = shell.task([
  'cross-env NODE_ENV=production_test_server webpack --config webpack/webpack.build.config.js --progress --display-error-details --optimize-minimize --color --watch'
]);

