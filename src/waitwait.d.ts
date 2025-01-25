/**
 * This file is part of waitwait.
 *
 * (c) Nicolas Talle <dev@nicolab.net>
 *
 * For the full copyright and license information, please view the LICENSE file
 * distributed with this source code
 * or visit https://github.com/Nicolab/waitwait
 */

/**
 * Sleep (like Unix sleep)
 *
 * ```ts
 * await sleep(1000) // sleep 1 seconde
 * ```
 *
 * @param ms - Time to sleep in milliseconds
 * @returns A Promise that resolves after the specified time
 */
export function sleep(ms: number): Promise<void>;

/**
 * A WaitGroup waits for a collection of actions to finish.
 * The main routine calls `add` to set the number of actions to wait for.
 * Then each of the actions runs and calls `done` when finished.
 * At the same time, `wait` can be used to return a promise that resolves when all actions have finished.
 *
 * `add`, `done`, `cancel` and `wait` can be called at any time, in any order.
 */
export class WaitGroup {
  private _n: number;
  private _wt: NodeJS.Timeout | null;
  private _p?: Promise<void>;
  private _resolve?: () => void;

  /**
   * Initialize WaitGroup with a starting counter defaulting to 0.
   *
   * @param n - Initial counter value
   */
  constructor(n?: number);

  /**
   * Adds a delta (default is 1), which may be negative, to the WaitGroup counter.
   * If the counter becomes zero, all promises returned from `wait` are resolved.
   * If the counter goes negative, an error is thrown.
   *
   * @param delta - The value to add to the counter
   * @throws {Error} If the counter becomes negative
   */
  add(delta?: number): void;

  /**
   * Decrements the WaitGroup counter by one.
   */
  done(): void;

  /**
   * Cancel the WaitGroup.
   * All promises returned from `wait` are resolved.
   */
  cancel(): void;

  /**
   * Returns a promise that resolves when the WaitGroup counter is zero or cancelled with `cancel`.
   * If the counter is zero when the method is called, it's resolved immediately.
   *
   * @returns A Promise that resolves when the counter reaches zero or the group is cancelled
   */
  wait(): Promise<void>;
}