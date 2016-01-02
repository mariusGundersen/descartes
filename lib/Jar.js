import probe from './probe';
import sensor from './sensor';
import AsyncQueue from './AsyncQueue';

export default class Jar {
  constructor(config = {timelimit: 1000, queue: new AsyncQueue()}) {
    this._queue = config.queue;
    this._timelimit = config.timelimit;
  }

  probe(displayName) {
    return probe(displayName, {queue: this._queue, timelimit: this._timelimit});
  }

  sensor(displayName) {
    return sensor(displayName, {queue: this._queue, timelimit: this._timelimit});
  }

  done() {
    if (this._queue.isEmpty === false){
      throw new Error('Jar is not empty');
    }
  }
}
