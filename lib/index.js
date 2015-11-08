export {awaitable} from './awaitable';

export function start(action){
  return Promise.resolve().then(action);
}
