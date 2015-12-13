import probe from './probe';
import sensor from './sensor';
import AsyncQueue from './AsyncQueue';

export default class Jar {
  constructor(config = {queue: new AsyncQueue()}) {
    this._queue = config.queue;
  }

  probe(displayName) {
    return probe(displayName, {queue: this._queue});
  }

  sensor(displayName) {
    return sensor(displayName, {queue: this._queue});
  }

  done() {
    if (this._queue.isEmpty === false){
      throw new Error('Jar is not empty');
    }
  }
}
