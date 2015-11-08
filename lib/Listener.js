const dummy = () => null;

export default class Listener{
  constructor(){
    this.listen = dummy;
  }
  onCall(match = () => true){
    return new Promise((resolve, reject) => {
      this.listen = call => {
        if (match(call)){
          this.listen = dummy;
          resolve(call);
        }
      };
    });
  }
  called(...args){
    return this.listen(...args);
  }
}
