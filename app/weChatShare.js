/**
 * wechatShare
 */

// service
import WechatSDKServiceIns from './share/weChatSDK/WechatSDK.service.ins';

// picture
import weChatSharePic from '../static/images/noUrl/weChatSharePic.png';

let
  defaultData = {
    imgUrl: window.location.href.replace(/\/[^/]*$/g, '') + '/' + weChatSharePic,
    link: window.location.href.replace(/(\?|#).*/g, ''),
    title: 'H5 Webpack Starter',
    desc: 'H5 webpack starter for webpack, gulp, es6/7, sass, pug, swiper, jsmpeg...',
  };

// WechatSDK
let
  defaultShare = () => {
    new WechatSDKServiceIns().onShare(defaultData);
  }

  , asyncShare = ({
                    imgUrl = defaultData.imgUrl,
                    link = defaultData.link,
                    title = defaultData.title,
                    desc = defaultData.desc,
                  }) => {
    new WechatSDKServiceIns().ready().onShareAsync({
      imgUrl,
      link,
      title,
      desc,
    });
  }
;

export {
  defaultShare,
  asyncShare,
};
