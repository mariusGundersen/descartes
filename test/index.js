import assert from 'assert';
import {probe, withArgs, withExactArgs, onThis} from '../lib/index';

describe('called', function () {

  beforeEach(function (){
    this.log = probe();
  });

  it('should wait until the log method is called', async function () {
    const result = doSomethingAsync(this.log);

    this.log.resolves(5);
    await this.log.called();

    assert.equal(await result, 5);
  });
});

describe('calledWith', function () {

  beforeEach(function (){
    this.log = probe();
  });

  it('should wait until the log method is called', async function () {
    const result = doSomethingAsync(this.log);

    this.log.resolves(5);
    await this.log.called(withArgs('resolved'));

    assert.equal(await result, 5);
  });
});

describe('calledWithExactly', function () {

  beforeEach(function (){
    this.log = probe();
  });

  it('should wait until the log method is called', async function () {
    const result = doSomethingAsync(this.log);

    await this.log.called(withExactArgs('resolved', 'with', 'args'));

    return await result;
  });
});

describe('calledOnThis', function () {

  beforeEach(function (){
    this.log = probe();
  });

  it('should wait until the log method is called', async function () {
    const result = doSomethingAsync(this.log);

    await this.log.called(onThis(undefined));

    return await result;
  });
});

describe('sync start', function (){
  it('should let you set up the first await after starting the async function', async function(){
    const log = probe();
    const result = doSomethingMoreComplexAsync(log);

    await log.called(withArgs('hello'));

    await log.called(withArgs('bye'));

    return await result;
  });
});

async function doSomethingAsync(log){
  await Promise.resolve();
  return log('resolved', 'with', 'args');
}

async function doSomethingMoreComplexAsync(log){
  log('hello');
  await Promise.resolve();
  log('bye', 'bye');
  return 50;
}
