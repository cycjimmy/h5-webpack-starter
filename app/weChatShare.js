/**
 * wechatShare
 */

// service
import WxShare from 'weixin-share';

// picture
import weChatSharePic from '../static/images/noUrl/weChatSharePic.png';

let
  defaultData = {
    imgUrl: window.location.href.replace(/\/[^/]*$/g, '') + '/' + weChatSharePic,
    link: window.location.href.replace(/(\?|#).*/g, ''),
    title: 'H5 Webpack Starter',
    desc: 'H5 webpack starter for webpack, gulp, es6/7, sass, pug, swiper, jsmpeg...',
  }

  , wxShareConfig = {
    appId: 'appId',
    timestamp: 'timestamp',
    nonceStr: 'nonceStr',
    signature: 'signature'
  }
;

export default () => new WxShare()
  .config(wxShareConfig)
  .setDefaultShare(defaultData)
  .share();
