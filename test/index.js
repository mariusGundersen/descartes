import assert from 'assert';
import {awaitable} from '../lib';

describe('called', function () {
  
  beforeEach(function(){
    this.log = awaitable();
  });
  
  it('should waint until the log method is called', async function () {
    const result = doSomethingAsync(this.log);
    
    await this.log.called();
    
    return await result;
  });
});

describe('calledWith', function () {
  
  beforeEach(function(){
    this.log = awaitable();
  });
  
  it('should waint until the log method is called', async function () {
    const result = doSomethingAsync(this.log);
    
    await this.log.calledWith('resolved');
    
    return await result;
  });
});

describe('calledWithExactly', function () {
  
  beforeEach(function(){
    this.log = awaitable();
  });
  
  it('should waint until the log method is called', async function () {
    const result = doSomethingAsync(this.log);
    
    await this.log.calledWithExactly('resolved', 'with', 'args');
    
    return await result;
  });
});

async function doSomethingAsync(log){
  await Promise.resolve();
  log('resolved', 'with', 'args');
}