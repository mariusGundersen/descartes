import Call from './Call';
import Listener from './Listener';

export function awaitable(){
  const listener = new Listener();
  const stub = function (...args){
    return listener.onCall(new Call(this, args));
  };

  stub.called = function (){
    return new Promise(resolve => listener.onCall = {resolve});
  };
  
  stub.calledWith = function (...args){
    return new Promise(resolve => listener.onCall = {resolve, match: call => arrayMatch(args, call.args)});
  };
  
  stub.calledWithExactly = function (...args){
    return new Promise(resolve => listener.onCall = {resolve, match: call => arrayMatch(args, call.args) && arrayMatch(call.args, args)});
  };

  return stub;
}

function arrayMatch(a, b){
  return a.every((x, i) => x === b[i]);
}