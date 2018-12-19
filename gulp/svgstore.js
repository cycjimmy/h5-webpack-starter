const
  fs = require('fs')
  , path = require('path')
  , gulp = require('gulp')
  , merge = require('merge-stream')
  , svgstore = require('gulp-svgstore')
  , imagemin = require('gulp-imagemin')
  , rename = require('gulp-rename')
  , cleanIcon = require('./clean').cleanIcon
;

const getFolders = dir => {
  return fs
    .readdirSync(dir)
    .filter(file => {
      return fs
        .statSync(path.join(dir, file))
        .isDirectory();
    });
};

const svgstoreNoClean = () => {
  const
    iconPath = srcPaths.icons.from
    , folders = getFolders(iconPath)
    , tasks = folders.map(folder => gulp
      .src(path.join(iconPath, folder, '/*.svg'))
      .pipe(imagemin())
      .pipe(svgstore())
      .pipe(rename(folder + '.svg'))
      .pipe(gulp.dest(srcPaths.icons.to)))
  ;

  return merge(tasks);
};

// Svg sprite
exports.svgstoreNoClean = svgstoreNoClean;
exports.svgstore = gulp.series(cleanIcon, svgstoreNoClean);

