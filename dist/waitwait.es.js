function waiting(wg) {
  return setTimeout(function() {
    if (wg._n !== 0)
      wg._wt = waiting(wg);
  }, 1e4);
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
class WaitGroup {
  constructor(n = 0) {
    this._n = n;
    this._wt = null;
  }
  add(delta = 1) {
    this._n += Number(delta);
    if (this._n < 0)
      throw new Error("Negative WaitGroup counter");
    if (this._n === 0) {
      this.cancel();
    }
  }
  done() {
    this.add(-1);
  }
  cancel() {
    if (this._resolve) {
      this._resolve();
      this._resolve = null;
    }
    if (this._wt !== null) {
      clearTimeout(this._wt);
      this._wt = null;
    }
  }
  wait() {
    if (!this._p) {
      this._p = new Promise((resolve) => {
        this._resolve = resolve;
        if (this._n === 0)
          return this.cancel();
        this._wt = waiting(this);
      });
    }
    return this._p;
  }
}
export { WaitGroup, sleep };
