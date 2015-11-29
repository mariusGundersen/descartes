import assert from 'assert';
import sensor from '../lib/sensor';

describe('sensor', function () {

  beforeEach(function (){
    this.a = sensor();
    this.b = sensor();
    this.c = sensor();
  });

  it('should work with synchronous methods', async function () {
    const result = doSomething(this.a, this.b, this.c);

    await this.a.called();

    await this.b.called();

    await this.c.called();

    assert.ok(result);
  });

  it('should work with asynchronous methods', async function () {
    const result = doSomethingAsync(this.a, this.b, this.c);

    await this.a.called();

    await this.b.called();

    await this.c.called();

    assert.ok(result);
  });

  it('should handle multiple calls to the same sensor', async function () {
    const result = doSomething(this.a, this.a, this.a);

    await this.a.called();

    await this.a.called();

    await this.a.called();

    assert.ok(result);
  });
});

function doSomething(a, b, c){
  a();
  b();
  c();

  return true;
}

async function doSomethingAsync(a, b, c){
  await Promise.resolve();
  a();
  await Promise.resolve();
  b();
  await Promise.resolve();
  c();
  await Promise.resolve();

  return true;
}
