# descartes [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Mock async JavaScript libraries


## Install

```sh
$ npm install --save descartes
```


## Usage

```js
import {sensor, probe, withArgs, withExactArgs, onThis} from 'descartes';

it("should behave like this", async function(){
  const stub = probe();
  const spy = sensor();
  
  const result = myAsyncMethod(spy, stub);

  await spy.called();
  await spy.called(withArgs('something'));
  await spy.called(withExactArgs('something', 'else'));
  
  stub.resolvesTo('something');
  await stub.called();
  
  stub.rejects(new Error('it should handle this'));
  await stub.called(
    withArgs(13),
    onThis(window));
    
  const call = await spy.called();
  call.args[0].should.equal('something');
  call.args[1].should.be.a('Function');
  call.args[1](null, 'result');
  
  (await result).should.equal('expected value');
});

```

## License

MIT © [Marius Gundersen](https://mariusgundersen.net)


[npm-image]: https://badge.fury.io/js/descartes.svg
[npm-url]: https://npmjs.org/package/descartes
[travis-image]: https://travis-ci.org/mariusGundersen/descartes.svg?branch=master
[travis-url]: https://travis-ci.org/mariusGundersen/descartes
[daviddm-image]: https://david-dm.org/mariusGundersen/descartes.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mariusGundersen/descartes
[coveralls-image]: https://coveralls.io/repos/mariusGundersen/descartes/badge.svg
[coveralls-url]: https://coveralls.io/r/mariusGundersen/descartes
