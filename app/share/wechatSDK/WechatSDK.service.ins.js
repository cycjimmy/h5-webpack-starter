// jssdk Demo http://203.195.235.76/jssdk/

// constructor
import {
  CreateInstance
} from '../awesome.func';

let
  _instance = new CreateInstance()
;

export default class WechatSDKServiceIns {
  constructor() {
    if (_instance()) {
      return _instance();
    }
    this.isReady = false;
    _instance(this);
  };

  /**
   * config
   * @param configData
   * {
   *  debug: false,
   *  appId: '',
   *  timestamp: 0,
   *  nonceStr: '',
   *  signature: '',
   *  jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone', 'onMenuShareWeibo'],
   * }
   */
  config(configData) {
    wx.config(configData);
  };

  ready() {
    wx.ready(() => {
      this.isReady = true;
    });

    return this;
  };

  /**
   * onShare
   * @param shareData
   */
  onShare(shareData) {
    wx.ready(() => {
      this.share(shareData);
    });
  };

  /**
   * onShareAsync
   * @param shareData
   */
  onShareAsync(shareData) {
    if (this.isReady) {
      this.share(shareData);
    }
  };

  /**
   * share
   * @param shareData
   *  {
   *    imgUrl: '',
   *    link: '',
   *    title: '',
   *    desc: '',
   *    type: '',  music/video/link(default)
   *    dataUrl: '', if music/video type
   *    trigger:() => {},
   *    success:() => {},
   *    cancel:() => {},
   *    fail:() => {},
   *  }
   *
   */
  share(shareData) {
    wx.onMenuShareAppMessage(shareData);
    wx.onMenuShareTimeline(shareData);
    wx.onMenuShareQQ(shareData);
    wx.onMenuShareQZone(shareData);
    wx.onMenuShareWeibo(shareData);
  };
};