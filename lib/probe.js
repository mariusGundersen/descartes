import Call from './Call';
import Listener from './Listener';
import {onTarget} from './matchers';

export default function probe(displayName = 'probe', config = {timelimit: 1000, queue: undefined}){
  const listener = new Listener(config.queue);
  let result = null;
  const probe = function (...args){
    return listener.called(new Call(probe, this, args)).then(() => result);
  };

  probe.called = function (...tests){
    return listener.awaitCall(probe, [onTarget(probe), ...tests], config.timelimit);
  };
  
  probe.resolves = function(value){
    result = Promise.resolve(value);
  };
  
  probe.rejects = function(value){
    result = Promise.reject(value);
  };
  
  probe.displayName = displayName;

  return probe;
}

function delay(miliseconds){
  return new Promise(resolve => setTimeout(resolve, miliseconds));
}