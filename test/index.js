import assert from 'assert';
import {awaitable} from '../lib';

describe('basic functionality', function () {
  
  beforeEach(function(){
    this.log = awaitable();
  });
  
  it('should waint until the log method is called', async function () {
    const result = doSomethingAsync(this.log);
    
    await this.log.called();
    assert(true, 'log was called');
    
    return await result;
  });
});

async function doSomethingAsync(log){
  await Promise.resolve();
  log('resolved');
}