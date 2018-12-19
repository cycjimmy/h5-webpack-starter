import QueryAll from '../../share/QueryAll';
import SlideComponent from '../Slide.component';
import instanceComponent from '../instanceComponent';

import slide from './imageCompressUploadDemo.pug';
import _style from './imageCompressUploadDemo.scss';

// service
import H5ImageCompressService from '../../share/H5ImageCompress/H5ImageCompress.service';
// import miniXhr from 'mini-xhr';

const _instance = instanceComponent(class extends SlideComponent {
  constructor({
                context,
                mainSwiper,
                slideIndex,
                audioComponent,
              }) {
    super({
      context,
      mainSwiper,
      slideIndex,
      audioComponent,
    });
    this.base64 = '';           // 压缩后base64图片
  };

  load() {
    return this.init({
      pugTemplate: slide,
      wrapperElement: this.context,
      insetParam: {
        _style,
      },
    });
  };

  paramInit() {
    this.oShowBox = this.context.querySelector('.' + _style.showBox);
    this.oInfo = this.context.querySelector('.' + _style.showInfo);
    this.oUploadBtn = this.context.querySelector('.' + _style.uploadBtn);
  };

  eventBind() {
    // 选择图片
    new QueryAll('.' + _style.chooseInput, this.context).on('change', e => {
      new H5ImageCompressService(e.target.files[0], {
        before: file => {
          console.log('压缩前...');
          this.base64 = '';
          this._changeBtnState();
        },
        done: (file, base64) => {
          console.log('压缩成功...');
          this._insertImg(base64);  // 显示压缩后
          this.base64 = base64;
          this._changeBtnState();
        },
        fail: (file) => {
          console.log('压缩失败...');
          this.base64 = '';
          this._changeBtnState();
        },
        complete: (file) => {
          console.log('压缩完成...');
        },
        notSupport: (file) => {
          console.error('压缩失败,浏览器不支持！');
        },
      }).init();
    });

    // 开始上传
    new QueryAll(this.oUploadBtn).on('click', () => {
      if (!this.oUploadBtn.classList.contains(_style.canUpload)) {
        return;
      }

      /* AJAX上传
       miniXhr(...);
      */

      alert('上传成功');
    });
  };

  /**
   * 预览图片
   * @param file 图片文件BASE64
   * @private
   */
  _insertImg(file) {
    let
      img = new Image()
      , size = file.length
      , base = 1024
    ;

    img.src = file;
    img.alt = 'preUploadPic';

    img.addEventListener('load', () => {
      this.oShowBox.innerHTML = '';
      this.oShowBox.appendChild(img);
      this.oInfo.textContent = 'size(compressed): ' + (size / base).toFixed(2) + 'KB';
    });

    file = null;
  };


  /**
   * 变更按钮状态
   * @private
   */
  _changeBtnState() {
    if (this.base64) {
      this.oUploadBtn.classList.add(_style.canUpload);
    } else {
      this.oUploadBtn.classList.remove(_style.canUpload);
    }
  };
});

export default (param) => _instance(param);

