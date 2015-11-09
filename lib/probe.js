import Call from './Call';
import Listener from './Listener';

export default function probe({timelimit}={timelimit:1000}){
  const listener = new Listener();
  let result = null;
  const probe = function (...args){
    return listener.called(new Call(this, args)).then(() => result);
  };

  probe.called = function (...tests){
    return listener.onCall(tests, timelimit);
  };
  
  probe.resolves = function(value){
    result = Promise.resolve(value);
  };
  
  probe.rejects = function(value){
    result = Promise.reject(value);
  };

  return probe;
}

function delay(miliseconds){
  return new Promise(resolve => setTimeout(resolve, miliseconds));
}