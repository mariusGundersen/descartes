export default class AsyncQueue {
  constructor() {
    this.items = [];
    this.receivers = [];
  }
  
  push(value) {
    if(this.receivers.length == 0){
      this.items.push(value);
    }else{
      this.receivers.shift()(value);
    }
  }
  
  pop() {
    return new Promise(resolve =>
      this.items.length == 0
        ? this.receivers.push(resolve)
        : resolve(this.items.shift()));
  }
}