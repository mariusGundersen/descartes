const dummy = () => null;

export default class Listener{
  constructor(){
    this.listen = dummy;
  }
  set onCall(resolve){
    this.listen = function (call){
      this.listen = dummy;
      resolve(call);
    };
  }
  get onCall(){
    return this.listen;
  }
}
