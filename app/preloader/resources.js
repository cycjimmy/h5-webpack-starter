import entries from '@cycjimmy/awesome-js-funcs/esm/object/entries';
import staticFiles from '@/staticFiles';

export default [
  // require('@static/images/').default,
  require('@static/images/noUrl/weChatSharePic.png').default,

  ...(() => {
    const aStaticFiles = [];
    entries(staticFiles).forEach(([k, v]) => {
      if (Object.prototype.hasOwnProperty.call(staticFiles, k)) {
        aStaticFiles.push(v);
      }
    });
    return aStaticFiles;
  })(),
];
