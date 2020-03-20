import {Page, singleton} from "@cycjimmy/h5-pages";
import H5ImageCompressService from '../../share/H5ImageCompress/H5ImageCompress.service';
import QueryAll from '../../share/QueryAll';

// import miniXhr from '@cycjimmy/mini-xhr';

import template from './imageCompressUploadDemo.pug';
import _style from './imageCompressUploadDemo.scss';

export default singleton(class extends Page {
  constructor() {
    super({
      name: 'imageCompressUploadDemo',
      renderHtml: template({_style}),
    });

    this.base64 = '';  // Base64 image after compression
  };

  paramInit() {
    super.paramInit();

    this.oShowBox = this.page.querySelector('.' + _style.showBox);
    this.oInfo = this.page.querySelector('.' + _style.showInfo);
    this.oUploadBtn = this.page.querySelector('.' + _style.uploadBtn);
  };

  eventBind() {
    super.eventBind();

    // Select Image
    new QueryAll('.' + _style.chooseInput, this.context).on('change', e => {
      new H5ImageCompressService(e.target.files[0], {
        before: file => {
          console.log('压缩前...');
          this.base64 = '';
          this._changeBtnState();
        },
        done: (file, base64) => {
          console.log('压缩成功...');
          this._insertImg(base64);  // After compression
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

    // Start upload
    new QueryAll(this.oUploadBtn).on('click', () => {
      if (!this.oUploadBtn.classList.contains(_style.canUpload)) {
        return;
      }

      /* AJAX upload
       miniXhr(...);
      */

      alert('上传成功');
    });
  };

  /**
   * _insertImg
   * @param file img file BASE64
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
   * _changeBtnState
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

