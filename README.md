# WaitWait

> WIP

Tiny implementation of Golang's `WaitGroup` and Unix's `sleep` for Javascript (browser and Node.js), with promises and zero dependencies.

## Install

With NPM:

```sh
npm install waitwait --save
```

or with Yarn:

```sh
yarn add waitwait
```

## Usage

### Sleep

sleep (wait) 1 seconde:

```js
import {sleep} from 'waitwait';

console.log('Start');

await sleep(1000);

console.log('End');
```

### WaitGroup

Waits until the routine is done:

```js
import {WaitGroup} from 'waitwait';

const wg = new WaitGroup();

wg.add();

console.log('Start');

setTimeout(() => {
  wg.done();
}, 1000);

await wg.wait();

console.log('End');
```

---

Waits until all routines are done:

```js
import {WaitGroup} from 'waitwait';

const wg = new WaitGroup();

wg.add(2);

console.log('Start');

setTimeout(() => {
  wg.done();
}, 1000);

setTimeout(() => {
  wg.done();
}, 4000);

await wg.wait();

console.log('End');
```

---

Waits forever:

```js
import {WaitGroup} from 'waitwait';

const wg = new WaitGroup();

console.log('Start');

wg.add();

console.log('This process is running forever');

await wg.wait();

console.log('End');
```

---

Cancel a `WaitGroup`:

```js
import {WaitGroup} from 'waitwait';

const wg = new WaitGroup();

// Add 10 routines
wg.add(10);

console.log('Start');

// Cancel all routines after 2 secondes
setTimeout(() => {
  wg.cancel();
}, 2000);

await wg.wait();

console.log('End');
```

## LICENSE

[MIT](https://github.com/Nicolab/waitwait/blob/master/LICENSE) (c) 2021, Nicolas Tallefourtane.

## Author

| [![Nicolas Tallefourtane - Nicolab.net](https://www.gravatar.com/avatar/d7dd0f4769f3aa48a3ecb308f0b457fc?s=64)](https://nicolab.net) |
|---|
| [Nicolas Talle](https://nicolab.net) |
| [![Make a donation via Paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=PGRH4ZXP36GUC) |
