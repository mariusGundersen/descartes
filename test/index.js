import assert from 'assert';
import {awaitable} from '../lib';

describe('called', function () {
  
  beforeEach(function(){
    this.log = awaitable();
  });
  
  it('should wait until the log method is called', async function () {
    const result = doSomethingAsync(this.log);
    
    this.log.returns(5);
    await this.log.called();
    
    assert.equal(await result, 5);
  });
});

describe('calledWith', function () {
  
  beforeEach(function(){
    this.log = awaitable();
  });
  
  it('should wait until the log method is called', async function () {
    const result = doSomethingAsync(this.log);
    
    this.log.resolves(5);
    await this.log.calledWith('resolved');
    
    assert.equal(await result, 5);
  });
});

describe('calledWithExactly', function () {
  
  beforeEach(function(){
    this.log = awaitable();
  });
  
  it('should wait until the log method is called', async function () {
    const result = doSomethingAsync(this.log);
    
    await this.log.calledWithExactly('resolved', 'with', 'args');
    
    return await result;
  });
});

async function doSomethingAsync(log){
  await Promise.resolve();
  return log('resolved', 'with', 'args');
}