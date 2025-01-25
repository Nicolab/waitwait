function e(i) {
  return setTimeout(function() {
    i._n !== 0 && (i._wt = e(i));
  }, 1e4);
}
function s(i) {
  return new Promise((t) => setTimeout(t, i));
}
class n {
  /**
   * Initialize WaitGroup with a starting counter defaulting to 0.
   */
  constructor(t = 0) {
    this._n = t, this._wt = null;
  }
  /**
   * Adds a delta (default is 1), which may be negative, to the WaitGroup counter.
   * If the counter becomes zero, all promises returned from `wait` are resolved.
   * If the counter goes negative, an error is thrown.
   *
   * @param {number} [delta=1]
   */
  add(t = 1) {
    if (this._n += Number(t), this._n < 0) throw new Error("Negative WaitGroup counter");
    this._n === 0 && this.cancel();
  }
  /**
   * Decrements the WaitGroup counter by one.
   */
  done() {
    this.add(-1);
  }
  /**
   * Cancel the WaitGroup.
   * All promises returned from `wait` are resolved.
   */
  cancel() {
    this._resolve && (this._resolve(), this._resolve = null), this._wt !== null && (clearTimeout(this._wt), this._wt = null);
  }
  /**
   * Returns a promise that resolves when the WaitGroup counter is zero or cancelled with `cancel`.
   * If the counter is zero when the method is called, it's resolved immediately.
   *
   * @returns {Promise}
   */
  wait() {
    return this._p || (this._p = new Promise((t) => {
      if (this._resolve = t, this._n === 0) return this.cancel();
      this._wt = e(this);
    })), this._p;
  }
}
export {
  n as WaitGroup,
  s as sleep
};
