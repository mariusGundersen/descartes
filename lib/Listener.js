import stringify from './stringify';
import AsyncQueue from './AsyncQueue';

export default class Listener{
  constructor(callQueue = new AsyncQueue()){
    this._callQueue = callQueue;
  }

  async awaitCall(target, tests, timelimit){
    const latest = await timeout(this._callQueue.pop(), createTimeoutError(tests, timelimit), timelimit);

    latest.resolve();
    const firstFailing = getAllFailing(tests, latest.call)[0];
    if (firstFailing === undefined){
      return latest.call;
    } else {
      throw new Error(`Expected ${target.displayName} ${firstFailing.expectedIt(stringify)}, actually ${firstFailing.actually(latest.call, stringify)}`);
    }
  }

  called(call){
    return new Promise(resolve => this._callQueue.push({call: call, resolve: resolve}));
  }
}

function getAllFailing(tests, call){
  return tests.filter(t => !t.test(call));
}

function timeout(promise, error, timelimit){
  return new Promise((resolve, reject) => {
    promise.then(resolve);
    setTimeout(() => reject(error, timelimit));
  });
}

function createTimeoutError(tests, timelimit){
  const firstExpected = tests.length === 0
    ? 'to have been called'
    : tests[0].expectedIt(stringify);
  return new Error(`Expected method ${firstExpected}, actually not called within ${timelimit}ms`);
}
