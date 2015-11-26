import assert from 'assert';
import Jar from '../lib/Jar';
import {withArgs, withExactArgs, onThis} from '../lib/matchers';

describe('jar', function () {
  
  beforeEach(function(){
    this.jar = new Jar();
    this.log = this.jar.sensor('log');
    this.a = this.jar.probe('a');
    this.b = this.jar.probe('b');
  });
  
  it('should check the global order of probes and sensors', async function () {
    const result = doSomethingAsync(this.log, this.a, this.b);

    await this.log.called(withArgs('calling a'));

    this.a.resolves(2);
    await this.a.called();

    await this.log.called(withExactArgs('called a'));

    await this.log.called(withExactArgs('calling b'));

    this.b.resolves(3);
    await this.b.called();

    await this.log.called(withExactArgs('called b'));

    assert.equal(await result, 5);
  });
});

async function doSomethingAsync(log, a, b){
  log('calling a');
  const first = await a();
  log('called a');
  log('calling b');
  const second = await b();
  log('called b');
  return first + second;
}