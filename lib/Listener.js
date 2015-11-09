import stringify from './stringify';

export default class Listener{
  constructor(){
    this.callQueue = [];
    this.listen = null;
  }
  onCall(tests, timelimit){
    return new Promise((resolve, reject) => {
      if(this.callQueue.length == 0){
        this.listen = call => {
          const firstFailing = getAllFailing(tests, call)[0];
          if (firstFailing == null){
            this.listen = null;
            resolve(call);
          }else{
            reject(new Error(`Expected method ${firstFailing.expectedIt(stringify)}, actually ${firstFailing.actually(call, stringify)}`));
          }
        };
      }else{
        const latest = this.callQueue.shift();
        const firstFailing = getAllFailing(tests, latest.call)[0];
        if (firstFailing == null){
          resolve(latest.call);
        }else{
          reject(new Error(`Expected method ${firstFailing.expectedIt(stringify)}, actually ${firstFailing.actually(latest.call, stringify)}`));
        }
        latest.resolve();
      }
      setTimeout(() => reject(new Error(`Expected method ${tests[0].expectedIt(stringify)}, actually not called within ${timelimit}ms`)), timelimit);
    });
  }
  called(call){
    if(this.listen == null){
      return new Promise(resolve => this.callQueue.push({call: call, resolve: resolve}));
    }else{
      this.listen(call);
      return Promise.resolve();
    }
  }
}

function getAllFailing(tests, call){
  return tests.filter(t => !t.test(call));
}