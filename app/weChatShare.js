import WxShare from '@cycjimmy/weixin-share';

// picture
import weChatSharePic from '../static/images/noUrl/weChatSharePic.png';

const defaultData = {
  imgUrl: window.location.href.replace(/\/[^/]*$/g, '') + '/' + weChatSharePic,
  link: window.location.href.replace(/(\?|#).*/g, ''),
  title: 'H5 Webpack Starter',
  desc: 'H5 webpack starter for webpack, gulp, es6/7, sass, pug, swiper, jsmpeg...',
};

// Get the following parameters from back-end
const wxShareConfig = {
  appId: 'appId',
  timestamp: 'timestamp',
  nonceStr: 'nonceStr',
  signature: 'signature'
};

export default () => new WxShare()
  .config(wxShareConfig)
  .setDefaultShare(defaultData)
  .share()
  .catch(e => console.error(e));
