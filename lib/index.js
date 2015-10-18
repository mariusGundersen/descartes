import Call from './Call';
import Listener from './Listener';

export function awaitable(){
  const listener = new Listener();
  const stub = function (...args){
    return listener.onCall(new Call(this, args));
  };

  stub.called = function (){
    return new Promise(resolve => listener.onCall = resolve);
  };

  return stub;
}
