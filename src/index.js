/**
 * This file is part of waitwait.
 *
 * (c) Nicolas Tallefourtane <dev@nicolab.net>
 *
 * For the full copyright and license information, please view the LICENSE file
 * distributed with this source code
 * or visit https://github.com/Nicolab/waitwait
 */

function waiting(wg) {
  return setTimeout(function () {
    if (wg._n !== 0) wg._wt = waiting(wg);
  }, 10_000);
}

/**
 * Sleep (like Unix sleep)
 *
 * ```js
 * await sleep(1000) // sleep 1 seconde
 * ```
 *
 * @param {number} ms
 * @returns {Promise}
 */
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * A WaitGroup waits for a collection of actions to finish.
 * The main routine calls `add` to set the number of actions to wait for.
 * Then each of the actions runs and calls `done` when finished.
 * At the same time, `wait` can be used to return a promise that resolves when all actions have finished.
 *
 * `add`, `done`, `cancel` and `wait` can be called at any time, in any order.
 */
export class WaitGroup {
  /**
   * Initialize WaitGroup with a starting counter defaulting to 0.
   */
  constructor(n = 0) {
    this._n = n;
    this._wt = null;
  }

  /**
   * Adds a delta (default is 1), which may be negative, to the WaitGroup counter.
   * If the counter becomes zero, all promises returned from `wait` are resolved.
   * If the counter goes negative, an error is thrown.
   *
   * @param {number} [delta=1]
   */
  add(delta = 1) {
    this._n += Number(delta);

    if (this._n < 0) throw new Error('Negative WaitGroup counter');

    if (this._n === 0) {
      this.cancel();
    }
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
    if (this._resolve) {
      this._resolve();
      this._resolve = null;
    }

    if (this._wt !== null) {
      clearTimeout(this._wt);
      this._wt = null;
    }
  }

  /**
   * Returns a promise that resolves when the WaitGroup counter is zero or cancelled with `cancel`.
   * If the counter is zero when the method is called, it's resolved immediately.
   *
   * @returns {Promise}
   */
  wait() {
    if (!this._p) {
      this._p = new Promise((resolve) => {
        this._resolve = resolve;

        if (this._n === 0) return this.cancel();

        this._wt = waiting(this);
      });
    }

    return this._p;
  }
}