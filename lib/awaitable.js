import Call from './Call';
import Listener from './Listener';

export function awaitable(){
  const listener = new Listener();
  let result = () => null;
  const stub = function (...args){
    listener.called(new Call(this, args));
    return result();
  };

  stub.called = function (){
    return listener.onCall(() => true);
  };

  stub.calledWith = function (...args){
    return listener.onCall(call => arrayMatch(args, call.args));
  };

  stub.calledWithExactly = function (...args){
    return listener.onCall(call => arrayMatch(args, call.args) && arrayMatch(call.args, args));
  };
  
  stub.returns = function(value){
    result = () => value;
  };
  
  stub.throws = function(value){
    result = () => {throw value};
  };
  
  stub.resolves = function(value){
    result = () => Promise.resolve(value);
  };
  
  stub.rejects = function(value){
    result = () => Promise.reject(value);
  };

  return stub;
}
  
function arrayMatch(a, b){
  return a.every((x, i) => x === b[i]);
}
