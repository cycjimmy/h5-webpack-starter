/**
 * 图片资源预加载进度
 * doc http://web.jobbole.com/83696/
 */

export default class ResLoaderService {
  /**
   *
   * @param baseUrl 基准url
   * @param resources 资源路径数组
   * @param onStart 加载开始回调函数，传入参数total
   * @param onProgress 正在加载回调函数，传入参数currentIndex, total
   * @param onComplete 加载完毕回调函数，传入参数total
   */
  constructor({
                baseUrl = './',
                resources = [],
                onStart = (total) => {
                },
                onProgress = (currentIndex, total) => {
                },
                onComplete = (total) => {
                },
              }) {
    this.baseUrl = baseUrl;
    this.resources = resources;
    this.onStart = onStart;
    this.onProgress = onProgress;
    this.onComplete = onComplete;

    this.status = 0;                          // 状态: 0：未启动   1：正在加载   2：加载完毕
    this.total = this.resources.length || 0;  // 资源总数
    this.currentIndex = 0;                    //当前正在加载的资源索引
  };

  start() {
    this.status = 1;

    this.resources.forEach((res) => {
      let
        url = ''
        , image = new Image()
      ;

      if (res.indexOf('http://') === 0 || res.indexOf('https://') === 0) {
        url = res;
      } else {
        url = this.baseUrl + res;
      }

      image.onload = () => {
        this.loaded();
      };
      image.onerror = () => {
        this.loaded();
      };
      image.src = url;
    });

    this.onStart(this.total);
  };


  loaded() {
    this.onProgress(++this.currentIndex, this.total);

    // Complete
    if (this.currentIndex === this.total) {
      this.onComplete(this.total);
    }
  };
};