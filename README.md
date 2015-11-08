# descartes [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Mock async JavaScript libraries


## Install

```sh
$ npm install --save descartes
```


## Usage

```js
import {start, awaitable, withArgs, withExactArgs, onThis} from 'descartes';

it("should behave like this", async function(){
  var stub = awaitable();
  
  const result = start(() => myAsyncMethod(stub));

  await stub.called();
  await stub.called(withArgs('something'));
  await stub.called(withExactArgs('something', 'else'));
  
  stub.resolvesTo('something');
  await stub.called();
  
  stub.returns(512);
  await stub.called();
  
  stub.throws(new Error('it should handle this'));
  await stub.called(
    withArgs(13),
    onThis(window));
    
  const call = await stub.called();
  call.args[0].should.equal('something');
  call.args[1].should.be.a('Function');
  call.args[1](null, 'result');
  
  return await result;
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
