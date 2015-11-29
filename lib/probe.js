import Call from './Call';
import Listener from './Listener';
import {onTarget} from './matchers';

export default function probe(displayName = 'probe', config = {timelimit: 1000, queue: undefined}){
  const listener = new Listener(config.queue);
  let result = null;
  const theProbe = function (...args){
    return listener.called(new Call(theProbe, this, args)).then(() => result);
  };

  theProbe.called = function (...tests){
    return listener.awaitCall(theProbe, [onTarget(theProbe), ...tests], config.timelimit);
  };

  theProbe.resolves = function (value){
    result = Promise.resolve(value);
  };

  theProbe.rejects = function (value){
    result = Promise.reject(value);
  };

  theProbe.displayName = displayName;

  return theProbe;
}
