import Call from './Call';
import Listener from './Listener';
import {onTarget} from './matchers';

export default function sensor(displayName = 'sensor', config = {timelimit: 1000, queue: undefined}){
  const listener = new Listener(config.queue);
  const theSensor = function (...args){
    listener.called(new Call(theSensor, this, args));
  };

  theSensor.called = function (...tests){
    return listener.awaitCall(theSensor, [onTarget(theSensor), ...tests], config.timelimit);
  };

  theSensor.displayName = displayName;

  return theSensor;
}
