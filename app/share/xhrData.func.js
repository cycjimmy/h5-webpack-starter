/**
 * xhr-Promise封装
 * @param type 类型
 * @param mode 传输方式(xhr, jsonp, script)
 * @param url 地址
 * @param dataType data类型
 * @param data 传值内容
 * @param timeout 超时设定
 * @param ontimeoutFn 超时处理
 * @returns {Promise}
 */
export default function ({
  type = 'POST',
  mode = 'xhr',
  url = '',
  dataType = '',
  data = '',
  timeout = 5000,
  ontimeoutFn = () => {
  },
},) {

  return new Promise((resolve, reject) => {

    if (mode === 'xhr') {
      //使用xhr传输
      let
        xhr = new XMLHttpRequest()
        ;

      xhr.open(type, url, true);
      xhr.onreadystatechange = handler;
      xhr.timeout = timeout;                          //0：没有时间限制
      xhr.ontimeout = ontimeoutFn;

      //判断用哪个type
      if (dataType === 'json') {
        xhr.responseType = "json";
        xhr.setRequestHeader("Accept", "application/json");
      } else {
        xhr.setRequestHeader("Accept", "*/*");
      }

      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");

      //console.log(pushData);
      xhr.send(data);


      function handler () {
        if (this.readyState !== 4) {
          return;
        }
        if (this.status >= 200 && this.status < 400) {
          console.log(this.response);
          resolve(this.response);
        } else {
          reject(new Error(this.statusText));
        }
      }


    }
    else {
      //'script'&'jsonp'

      let
        oHead = document.querySelector('head')
        , oScript = document.createElement('script')
        ;


      oScript.type = 'text/javascript'; //赋值oScript.type


      if (mode === 'script') {
        //直接运行script

        //赋值oScript.src
        oScript.src = url + '?' + data;

        let
          //回调传出
          scriptCallback = (e) => {
            //清理oScript
            oHead.removeChild(oScript);
            clearTimeout(oScript.timer);

            // console.log(e);

            //传出数据
            resolve(e);
          };

        //回调
        oScript.addEventListener('load', scriptCallback, false);


        console.log(timeout);

        //超时处理
        if (timeout) {
          oScript.timer = setTimeout(() => {
            //清理oScript
            oScript.removeEventListener('load', scriptCallback, false);
            oHead.removeChild(oScript);

            //传出错误
            reject(new Error('超时'));
          }, timeout);
        }

      } else {
        //使用jsonp传输
        let
          callbackName = ('jsonp_' + Math.random()).replace(".", "")
          ;

        //jsonp回调函数
        window[callbackName] = (json) => {
          console.log(json);

          //清理oScript
          oHead.removeChild(oScript);
          clearTimeout(oScript.timer);
          window[callbackName] = null;

          //传出数据
          resolve(json);
        };

        //赋值oScript.src
        oScript.src = url + '?' + data + '&callback=' + callbackName;

        //超时处理
        if (timeout) {
          oScript.timer = setTimeout(() => {
            //清理oScript
            oHead.removeChild(oScript);
            window[callbackName] = null;

            //传出错误
            reject(new Error('超时'));
          }, timeout);
        }
      }


      //发送请求
      oHead.appendChild(oScript);

    }
  });

};