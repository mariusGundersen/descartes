import Call from './Call';
import Listener from './Listener';

export function awaitable({timelimit}={timelimit:1000}){
  const listener = new Listener();
  let result = () => null;
  const stub = function (...args){
    return listener.called(new Call(this, args)).then(() => result());
  };

  stub.called = function (...tests){
    if(tests.length == 0){
      tests.push({
        test: () => true,
        expectedIt: () => `to have been called`,
        actually: () => `not called`
      });
    }
    return listener.onCall(tests, timelimit);
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

function delay(miliseconds){
  return new Promise(resolve => setTimeout(resolve, miliseconds));
}