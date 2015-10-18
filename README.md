# descartes [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Mock async JavaScript libraries


## Install

```sh
$ npm install --save descartes
```


## Usage

```js
import {awaitable, sequence} from 'descartes';

it("should behave like this", async function(){
  var stub = awaitable();
  
  const result = myAsncMethodToTest(stub);

  await stub.called();
  await stub.calledWith('something');
  await stub.calledWithExactly('something', 'else');
  
  await stub.resolvesTo('something');
  await stub.rejects(new Error());
  
  await stub.throws(new Error()).unless.calledWithExactly('something');
  await stub.rejects(new Error()).unless.calledWithExactly('something');
  
  const call = await stub.called();
  call.args[0].should.equal('something');
  call.args[1].should.be.a('Function');
  call.args[1](null, 'result');
  
  const seq = sequence();
  
  await stub.inSequence(seq).calledWith('1');
  await stub.inSequence(seq).calledWith('2');
  await stub.inSequence(seq).calledWith('3');
  
  return await stub();
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
