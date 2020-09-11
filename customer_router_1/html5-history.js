export default class Html5History {
  constructor(router, pathList) {
    this.addEvent();
    this.router = router;
    this.pathList = pathList;
    this._viewChange = this.viewChange.bind(this);
    window.addEventListener('load', this._viewChange);
    window.addEventListener('popstate', this._viewChange);
    window.addEventListener('pushState', this._viewChange);
    window.addEventListener('replaceState', this._viewChange);
  }

  addEvent() {
    const listenWrapper = function (type) {
      const _func = history[type];
      return function () {
        const func = _func.apply(this, arguments);
        // 因为pushState/replaceState不能触发popstate事件，需要自定义事件
        let e = new CustomEvent(type);
        // dispatchEvent用来触发事件
        window.dispatchEvent(e);
        return func;
      }
    }
    window.history.pushState = listenWrapper('pushState');
    window.history.replaceState = listenWrapper('replaceState');
  }

  viewChange() {
    let pathname = location.pathname;
    if (pathname === '/' || !this.pathList[pathname]) {
      window.location.pushState(null, '', `${location.origin}${this.pathList._defaultRouter}`);
      // window.location.pathname = this.pathList._defaultRouter;
    } else {
      this.router.wrapper.innerHTML = this.pathList[pathname].component;
    }
  }

  push(url, onComplete) {
    window.location.pushState(null, '', `${location.origin}${url}`);
    onComplete && onComplete();
  }

  replace(url, onComplete) {
    window.location.replaceState(null, '', `${location.origin}${url}`);
    onComplete && onComplete();
  }

  remove() {
    window.removeEventListener('load', this._viewChange);
    window.removeEventListener('popstate', this._viewChange);
    window.removeEventListener('pushState', this._viewChange);
    window.removeEventListener('replaceState', this._viewChange);
  }
}
