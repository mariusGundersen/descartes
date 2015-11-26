import Call from './Call';
import Listener from './Listener';
import {onTarget} from './matchers';

export default function sensor(displayName = 'sensor', config = {timelimit: 1000, queue: undefined}){
  const listener = new Listener(config.queue);
  const sensor = function (...args){
    listener.called(new Call(sensor, this, args));
  };

  sensor.called = function (...tests){
    return listener.awaitCall(sensor, [onTarget(sensor), ...tests], config.timelimit);
  };
  
  sensor.displayName = displayName;
  
  return sensor;
}