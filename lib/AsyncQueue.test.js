import assert from 'assert';
import AsyncQueue from './AsyncQueue';

describe('Async Queue', function (){
  it('should create an instance', function (){
    assert.ok(new AsyncQueue());
  });

  it('should start empty', function (){
    assert.ok(new AsyncQueue().isEmpty);
  });

  describe('push before pop', function (){
    before(function (){
      this.queue = new AsyncQueue();
      this.queue.push('test');
    });

    it('should not be empty', function (){
      assert.equal(this.queue.isEmpty, false);
    });

    it('should pop the right value', async function (){
      const value = await this.queue.pop();
      assert.equal(value, 'test');
    });

    it('should be empty again', function (){
      assert.ok(this.queue.isEmpty);
    });
  });

  describe('push after pop', function (){
    before(function (){
      this.queue = new AsyncQueue();
      this.value = this.queue.pop();
    });

    it('should not be empty', function (){
      assert.equal(this.queue.isEmpty, false);
    });

    it('should pop the right value', async function (){
      this.queue.push('test');
      assert.equal(await this.value, 'test');
    });

    it('should be empty again', function (){
      assert.ok(this.queue.isEmpty);
    });
  });
});
