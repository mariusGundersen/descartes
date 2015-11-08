export function withArgs(...args){
  return call => arrayMatch(args, call.args);
};

export function withExactArgs(...args){
  return call => arrayMatch(args, call.args) && arrayMatch(call.args, args);
};

export function onThis(that){
  return call => call.self === that;
}

function arrayMatch(a, b){
  return a.every((x, i) => x === b[i]);
}