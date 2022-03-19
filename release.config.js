/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-template-curly-in-string: "off" */
const makeConfig = require('@cycjimmy/config-lib/cjs/semanticRelease/15.x/makeConfig.cjs').default;

module.exports = makeConfig({
  npmOptions: {
    npmPublish: false,
  },
  git: true,
  gitAssets: [
    'package.json',
  ],
});
