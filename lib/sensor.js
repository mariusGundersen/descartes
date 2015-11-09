import Call from './Call';
import Listener from './Listener';

export default function sensor({timelimit}={timelimit:1000}){
  const listener = new Listener();
  const sensor = function (...args){
    listener.called(new Call(this, args));
  };

  sensor.called = function (...tests){
    return listener.awaitCall(tests, timelimit);
  };
  
  return sensor;
}