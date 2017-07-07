/**
 * h5图片压缩
 */
export default class H5ImageCompressService {
  constructor(file, options) {
    this.file = file;
    this.options = Object.assign(DEFAULT_OPTIONS, options);
  };

  init() {
    if (URL && File && document.createElement('canvas').getContext) {
      this.read(this.file);
    } else { // 浏览器不支持
      this.options.notSupport();
    }
  };

  /**
   * 读取文件，用canvas绘制，并用toDataURL来压缩后转成base64
   * @param file
   */
  read(file) {
    let
      img = new Image()
      , fileURL = URL.createObjectURL(file)
      , canvas
      , ctx
      , encoder
      , base64
      , handler
    ;

    if (this.options.before(file) === false) {
      return;
    }

    img.src = fileURL;

    img.addEventListener('load', () => {
      handler = (orientation) => {
        let
          size = this._getSize(img, orientation)
        ;
        canvas = document.createElement('canvas');
        canvas.width = size.width;
        canvas.height = size.height;
        ctx = canvas.getContext('2d');

        if (isOldIos) {
          // doc: https://github.com/stomita/ios-imagefile-megapixel
          import('./megapix-image')
            .then(MegaPixImage => {
              let
                iosImg = new MegaPixImage(img)
                , needTranspose = ~"68".indexOf(orientation)
                , iosRenderOptions = {
                  maxWidth: needTranspose ? canvas.height : canvas.width,
                  maxHeight: needTranspose ? canvas.width : canvas.height,
                  orientation: orientation,
                }
              ;

              iosImg.render(canvas, iosRenderOptions);
              base64 = canvas.toDataURL('image/jpeg', this.options.quality);

              this._handler('done', canvas, img, fileURL, base64, file);
            });
        } else {
          // 其他设备
          switch (orientation) {
            // 180度
            case 3:
              ctx.rotate(180 * Math.PI / 180);
              ctx.drawImage(img, -canvas.width, -canvas.height, canvas.width, canvas.height);
              break;

            // 90度
            case 6:
              ctx.rotate(90 * Math.PI / 180);
              ctx.drawImage(img, 0, -canvas.width, canvas.height, canvas.width);
              break;

            // 270度
            case 8:
              ctx.rotate(270 * Math.PI / 180);
              ctx.drawImage(img, -canvas.height, 0, canvas.height, canvas.width);
              break;

            default:
              ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          }

          if (isAndroid && isInWechat) {
            // 安卓微信下
            // https://github.com/fex-team/webuploader/blob/master/src/runtime/html5/jpegencoder.js
            import('./jpegencoder')
              .then(JPEGEncoder => {
                encoder = new JPEGEncoder();
                base64 = encoder.encode(ctx.getImageData(0, 0, canvas.width, canvas.height), this.options.quality * 100);
                this._handler('done', canvas, img, fileURL, base64, file);
              });
          } else {
            base64 = canvas.toDataURL('image/jpeg', this.options.quality);
            this._handler('done', canvas, img, fileURL, base64, file);
          }
        }


      };

      if (!isAndroid) {
        // 非安卓需要引入exif获取orientation来drawImage
        // doc: https://github.com/exif-js/exif-js
        // import('exif-js')
        import('./exif')
          .then(EXIF => {
            EXIF.getData(img, function () {
              handler(EXIF.getTag(this, "Orientation"));
            });
          });
      } else {
        handler();
      }
    });

    img.addEventListener('error', () => {
      this._handler('fail', canvas, img, fileURL, base64, file);
    });
  };

  /**
   * 处理
   * @param action
   * @param canvas
   * @param img
   * @param fileURL
   * @param base64
   * @param file
   * @private
   */
  _handler(action, canvas, img, fileURL, base64, file) {
    // 释放内存
    canvas = null;
    img = null;
    URL.revokeObjectURL(fileURL);

    this.options[action](file, base64);
    this.options['complete'](file);
  };

  /**
   * 获取宽高 矫正比例方向
   * @param img
   * @param orientation {number}  1:正常 3:180度 6:90度 8:270度
   * @returns {{width, height}}
   * @private
   */
  _getSize(img, orientation) {
    let
      mW = this.options.maxWidth
      , mH = this.options.maxHeight
      , w = img.width
      , h = img.height
      , aspectRatio
    ;

    if (~"68".indexOf(orientation)) { // 90，270度则高宽互换
      w = img.height;
      h = img.width;
    }

    aspectRatio = w / h;

    if (mW && mH) {
      if (aspectRatio >= mW / mH) {
        if (w > mW) {
          h = mW / aspectRatio;
          w = mW;
        }
      } else {
        if (h > mH) {
          w = mH * aspectRatio;
          h = mH;
        }
      }
    } else if (mW) {
      if (mW < w) {
        h = mW / aspectRatio;
        w = mW;
      }
    } else if (mH) {
      if (mH < h) {
        w = mH * aspectRatio;
        h = mH;
      }
    }

    return {
      width: w,
      height: h,
    };
  };

};

// private
let
  ua = navigator.userAgent
  , isInWechat = ~ua.indexOf('MicroMessenger')
  , isAndroid = ~ua.indexOf('Android')
  , isOldIos = (() => {
    let match = navigator.userAgent.match(/(\d)_\d like Mac OS/);
    return match && match[1] <= 7;
  })()
  , URL = window.URL || window.webkitURL
;

const
  DEFAULT_OPTIONS = {
    maxWidth: 1280,
    maxHeight: 1280,
    quality: 0.6,
    before: () => {
    },
    done: () => {
    },
    fail: () => {
    },
    complete: () => {
    },
    notSupport: () => {
    }
  };
