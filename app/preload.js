import addPreloadLink from '@cycjimmy/awesome-js-funcs/dom/addPreloadLink';

const videoSrc = '';

addPreloadLink({
  href: videoSrc,
  as: 'video',
  type: 'video/mp4'
});
