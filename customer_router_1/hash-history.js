export default class HashHistory {
  constructor(router, pathList) {
    this.router = router;
    this.pathList = pathList;
    // 移除事件 需要和 绑定事件  是同一个函数。
    // 因为bind返回的是一个新函数，所以其实不是同一个函数，需要提出来重新赋值
    this._viewChange = this.viewChange.bind(this);
    window.addEventListener('load', this._viewChange);
    window.addEventListener('hashchange', this._viewChange);
  }

  viewChange() {
    let hash = location.hash;
    // 如果匹配失败，跳转到默认路由
    if (!location.hash || !this.pathList[hash.slice(1)]) {
      window.location.hash = this.router._defaultRouter;
    } else {
      this.router.wrapper.innerHTML = this.pathList[hash.slice(1)];
    }
  }

  // 修改url hash部分；浏览器历史纪录(history对象)会自动增加一条访问记录
  push(url, onComplete) {
    window.location.hash = `#${url}`;
    onComplete();
  }

  // 替换
  replace(url, onComplete) {
    if (!this.router._supportReplaceState) {
      window.location.hash = url; // 为了触发hashchange事件
      let _url = `${location.origin}/#${url}`;
      // 可以装载一个新文档而无须为它创建一个新的历史记录，也就是说，在浏览器的历史列表中，新文档将替换当前文档
      history.replaceState(null, '', _url);
    } else {
      let _url = `${location.origin}/#${url}`
      window.location.replace(_url);
    }
    onComplete && onComplete();
  }

  // 移出事件
  remove() {
    // 移除事件 需要和 绑定事件  是同一个函数。
    // 因为bind返回的是一个新函数，所以其实不是同一个函数，需要提出来重新赋值
    window.removeEventListener('load', this._viewChange);
    window.removeEventListener('hashchange', this._viewChange);
  }
}
