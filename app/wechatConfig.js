// 微信测试号
import * as imgLogo from '../static/images/logo128.png';

let
  wxData = {
    imgUrl: imgLogo,
    link: window.location.href,
    title: 'H5 Webpack Starter',
    desc: 'H5 webpack starter for webpack, gulp, es6/7, sass, pug, swiper, jsmpeg...',
  }
;

// config
wx.config({
  debug: false,
  appId: '',
  timestamp: 0,
  nonceStr: '',
  signature: '',
  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareWeibo', 'startRecord', 'stopRecord', 'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice', 'downloadVoice', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'translateVoice', 'getNetworkType', 'openLocation', 'getLocation', 'hideOptionMenu', 'showOptionMenu', 'hideMenuItems', 'showMenuItems', 'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem', 'closeWindow', 'scanQRCode']
});

wx.ready(function () {
  //分享到朋友圈
  wx.onMenuShareTimeline({
    title: wxData.title, // 分享标题
    link: wxData.link, // 分享链接
    imgUrl: wxData.imgUrl,// 分享图标
    success: function () {
      // 用户确认分享后执行的回调函数
      //alert('已分享');
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
      //alert('已取消');
    }
  });

  // 分享给朋友
  wx.onMenuShareAppMessage({
    title: wxData.title, // 分享标题
    desc: wxData.desc, // 分享描述
    link: wxData.link, // 分享链接
    imgUrl: wxData.imgUrl, // 分享图标
    type: '', // 分享类型,music、video或link，不填默认为link
    dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
    success: function () {
      // 用户确认分享后执行的回调函数
    },
    cancel: function () {
      // 用户取消分享后执行的回调函数
    }
  });

});
