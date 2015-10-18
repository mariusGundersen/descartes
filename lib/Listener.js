const dummy = () => null;

export default class Listener{
  constructor(){
    this.listen = dummy;
  }
  set onCall({resolve, match = () => true}){
    this.listen = function (call){
      if(match(call)){
        this.listen = dummy;
        resolve(call);
      }
    };
  }
  get onCall(){
    return this.listen;
  }
}
