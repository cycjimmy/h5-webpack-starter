const ghPages = require('gh-pages');

// Deploy to ghPages
exports.deploy = () => ghPages.publish(srcPaths.build, {
  src: ['**/*']
}, (err) => {
  console.error(err);
});

