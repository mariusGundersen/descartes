import stringify from './stringify';

const dummy = () => null;

export default class Listener{
  constructor(){
    this.listen = dummy;
  }
  onCall(tests, timelimit){
    return new Promise((resolve, reject) => {
      this.listen = call => {
        const firstFailing = getAllFailing(tests, call)[0];
        if (firstFailing == null){
          this.listen = dummy;
          resolve(call);
        }else{
          reject(new Error(`Expected method ${firstFailing.expectedIt(stringify)}, actually ${firstFailing.actually(call, stringify)}`));
        }
      };
      setTimeout(() => reject(new Error(`Expected method ${tests[0].expectedIt(stringify)}, actually not called within ${timelimit}ms`)), timelimit);
    });
  }
  called(call){
    return this.listen(call);
  }
}

function getAllFailing(tests, call){
  return tests.filter(t => !t.test(call));
}