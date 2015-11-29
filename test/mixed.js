import assert from 'assert';
import probe from '../lib/probe';
import sensor from '../lib/sensor';
import {withArgs} from '../lib/matchers';

describe('mixed', function () {

  beforeEach(function (){
    this.log = sensor();
    this.a = probe();
    this.b = probe();
  });

  it('should handle sync methods too', async function () {
    const result = doSomethingAsync(this.log, this.a, this.b);

    await this.log.called(withArgs('calling a'));

    this.a.resolves(2);
    await this.a.called();

    await this.log.called(withArgs('called a'));

    await this.log.called(withArgs('calling b'));

    this.b.resolves(3);
    await this.b.called();

    await this.log.called(withArgs('called b'));

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
