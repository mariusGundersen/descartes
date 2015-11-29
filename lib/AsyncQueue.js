export default class AsyncQueue {
  constructor() {
    this._items = [];
    this._receivers = [];
  }

  push(value) {
    if (this._receivers.length === 0) {
      this._items.push(value);
    } else {
      this._receivers.shift()(value);
    }
  }

  pop() {
    return new Promise(resolve =>
      this._items.length === 0
        ? this._receivers.push(resolve)
        : resolve(this._items.shift()));
  }
}
