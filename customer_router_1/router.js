import HashHistory from './hash-history';
import Html5History from './html5-history';

export default class Router {
  constructor(wrapper, options, mode = 'hash') {
    this.wrapper = document.querySelector(`#${wrapper}`);
    if (!this.wrapper) {
      throw new Error(`请提供一个容器元素插入`);
    }
    // 匹配的路径
    this.pathList = {};
    this.route(options.routes);
    // 默认路由
    this._defaultRouter = options.routes[0].path;
    // 是否支持HTML5 History 模式
    this._supportReplaceState =
      window.history && typeof window.history.replaceState === 'function';
    // this._history = new HashHistory(this, this.pathList);
    this._history =
      mode === 'hash' || !this._supportReplaceState ?
      new HashHistory(this, this.pathList) :
      new Html5History(this, this.pathList);
  }

  route(routes) {
    // 以path作为对象的键，方便后边查询匹配对应的component模板
    routes.forEach((item) => {
      this.pathList[item.path] = item.component;
    });
  }

  // 给浏览器历史纪录(history对象)里增加一条访问记录
  push(url, onComplete) {
    this._history.push(url, onComplete);
  }

  // 原生浏览器前进
  go(num = 1) {
    window.history.go(num);
  }

  // 原生浏览器后退
  back(num = -1) {
    window.history.go(num);
  }

  // 替换
  replace(url, onComplete) {
    this._history.replace(url, onComplete);
  }

  // 移除事件
  remove() {
    this._history.remove();
  }
}
