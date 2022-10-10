function e(i) {
  return setTimeout(function() {
    i._n !== 0 && (i._wt = e(i));
  }, 1e4);
}
function s(i) {
  return new Promise((t) => setTimeout(t, i));
}
class n {
  constructor(t = 0) {
    this._n = t, this._wt = null;
  }
  add(t = 1) {
    if (this._n += Number(t), this._n < 0)
      throw new Error("Negative WaitGroup counter");
    this._n === 0 && this.cancel();
  }
  done() {
    this.add(-1);
  }
  cancel() {
    this._resolve && (this._resolve(), this._resolve = null), this._wt !== null && (clearTimeout(this._wt), this._wt = null);
  }
  wait() {
    return this._p || (this._p = new Promise((t) => {
      if (this._resolve = t, this._n === 0)
        return this.cancel();
      this._wt = e(this);
    })), this._p;
  }
}
export {
  n as WaitGroup,
  s as sleep
};
