const
  cache = require('gulp-cache')
  , del = require('del')
;

// Clear the icon folder
exports.cleanIcon = callback => {
  del(srcPaths.icons.to);
  return cache.clearAll(callback);
};

