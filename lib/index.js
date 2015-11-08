import Call from './Call';
import Listener from './Listener';

export function awaitable(){
  const listener = new Listener();
  const stub = function (...args){
    return listener.called(new Call(this, args));
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

  return stub;
}

function arrayMatch(a, b){
  return a.every((x, i) => x === b[i]);
}
