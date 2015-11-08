const dummy = () => null;

export default class Listener{
  constructor(){
    this.listen = dummy;
  }
  onCall(tests, timelimit){
    return new Promise((resolve, reject) => {
      this.listen = call => {
        if (tests.every(t => t(call))){
          this.listen = dummy;
          resolve(call);
        }else{
          reject(new Error(`Not called correctly`));
        }
      };
      setTimeout(() => reject(new Error(`Not called within ${timelimit}ms`)), timelimit);
    });
  }
  called(call){
    return this.listen(call);
  }
}
