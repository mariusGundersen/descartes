import assert from 'assert';
import {awaitable, start} from '../lib';
import {withArgs, withExactArgs, onThis} from '../lib';

describe('mixed', function () {
  
  beforeEach(function(){
    this.log = awaitable();
    this.a = awaitable();
    this.b = awaitable();
  });
  
  it('should handle sync methods too', async function () {
    const result = doSomethingAsync(this.log, this.a, this.b);
    console.log('  1');
    await this.log.called(withArgs('calling a'));
    console.log('  2');
    this.a.returns(2);
    await this.a.called();
    console.log('  3');
    await this.log.called(withArgs('called a'));
    console.log('  4');
    await this.log.called(withArgs('calling b'));
    console.log('  5');
    this.b.returns(3);
    await this.b.called();
    console.log('  6');
    await this.log.called(withArgs('called b'));
    console.log('  7');
    assert.equal(await result, 5);
  });
});

async function doSomethingAsync(log, a, b){
  console.log('1');
  log('calling a');
  console.log('2');
  const first = await a();
  console.log('3');
  log('called a');
  console.log('4');
  log('calling b');
  console.log('5');
  const second = await b();
  console.log('6');
  log('called b');
  console.log('7')
  return first + second;
}