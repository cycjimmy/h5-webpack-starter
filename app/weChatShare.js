/**
 * wechatShare
 */

// service
import WechatSDKServiceIns from './share/weChatSDK/WechatSDK.service.ins';

// picture
import * as weChatSharePic from '../static/images/noUrl/weChatSharePic.png';

// WechatSDK
new WechatSDKServiceIns().onShare({
  imgUrl: window.location.href.replace(/\/[^/]*$/g, '') + '/' + weChatSharePic,
  link: window.location.href.replace(/(\?|#).*/g, ''),
  title: 'H5 Webpack Starter',
  desc: 'H5 webpack starter for webpack, gulp, es6/7, sass, pug, swiper, jsmpeg...',
});

