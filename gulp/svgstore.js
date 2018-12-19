const
  fs = require('fs')
  , path = require('path')
  , gulp = require('gulp')
  , runSequence = require('run-sequence')
  , merge = require('merge-stream')
  , svgstore = require('gulp-svgstore')
  , imagemin = require('gulp-imagemin')
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

// Svg sprite
gulp.task('svgstore:noClean', () => {
  const
    iconPath = srcPaths.icons.from
    , folders = getFolders(iconPath)
    , tasks = folders.map(folder => {
      return gulp
        .src(path.join(iconPath, folder, '/*.svg'))     // Path
        .pipe(imagemin())                               // Compress svg
        .pipe(svgstore())                               // Merge svg
        .pipe(gulp.dest(srcPaths.icons.to));
    });

  return merge(tasks);
});

gulp.task('svgstore', callback => {
  runSequence('clean:icon', 'svgstore:noClean',
    callback
  );
});