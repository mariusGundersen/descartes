export function withArgs(...args){
  return {
    test(call){
      return arrayMatch(args, call.args)
    },
    expectedIt: stringify => `to be called with at least (${args.map(stringify).join(', ')})`,
    actually: (call, stringify) => `called with (${call.args.map(stringify).join(', ')})`
  };
};

export function withExactArgs(...args){
  return {
    test(call){
      return arrayMatch(args, call.args) && arrayMatch(call.args, args)
    },
    expectedIt: stringify => `to be called with exactly (${args.map(stringify).join(', ')})`,
    actually: (call, stringify) => `called with (${call.args.map(stringify).join(', ')})`
  };
};

export function onThis(that){
  return {
    test: call => call.self === that,
    expectedIt: stringify => `to be called with ${stringify(that)} as this`,
    actually: (call, stringify) => `called with ${stringify(call.self)} as this`
  };
}

function arrayMatch(a, b){
  return a.every((x, i) => x === b[i]);
}