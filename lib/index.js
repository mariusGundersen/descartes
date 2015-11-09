export {awaitable} from './awaitable';

export {sensor} from './sensor';

export * from './matchers';

export function start(action){
  return Promise.resolve().then(action);
}