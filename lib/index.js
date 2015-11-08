export {awaitable} from './awaitable';

export * from './matchers';

export function start(action){
  return Promise.resolve().then(action);
}