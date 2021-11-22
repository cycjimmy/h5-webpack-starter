/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */
/* eslint no-template-curly-in-string: "off" */
const makeConfig = require('@cycjimmy/config-lib/cjs/semanticRelease/15.x/makeConfig').default;

module.exports = makeConfig({
  npmOptions: {
    npmPublish: false,
  },
  git: true,
  gitAssets: [
    'package.json',
    'package-lock.json',
  ],
  exec: true,
  execOptions: {
    successCmd: 'git push origin HEAD:release',
  },
});
