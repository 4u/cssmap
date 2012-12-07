
var create = function(frequency, symbols) {
  var symbolslen = symbols.length;

  var tempCssMap = [];
  for(var name in frequency) {
    tempCssMap.push([name, frequency[name]]);
  }

  tempCssMap.sort(function(a, b) {
    return b[1] - a[1];
  });

  var len = 0;
  var counter = 0;

  var cssMap = {};
  tempCssMap.forEach(function(arr, pos) {
    var val = arr[0];
    var ret = [];

    var modulo = pos % symbolslen;
    var p = Math.floor(pos / symbolslen);

    ret.push(symbols[modulo]);
    if (p > 0) {
      while(p) {
        modulo = p % symbolslen;
        ret.push(symbols[modulo]);
        p = Math.floor(p / symbolslen);
      }
    }

    cssMap[val] = ret.reverse().join('');
  });

  return cssMap;
};

module.exports = {
  create: create
};
