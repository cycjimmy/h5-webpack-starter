// eslint-disable-next-line import/no-extraneous-dependencies
const makeConfig = require('@cycjimmy/config-lib/semanticRelease/15.x/makeConfig');

module.exports = makeConfig({
  npmOptions: {
    npmPublish: false,
  },
  git: true,
  gitAssets: [
    "package.json",
    "package-lock.json"
  ]
});
