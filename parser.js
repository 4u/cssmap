var XRegExp = require('xregexp').XRegExp;

var parse = function(str) {
  var replaces = [];

  var recursive = XRegExp.matchRecursive(str, '{', '}', 'g', {
    valueNames: [null, null, 'value', null],
    escapeChar: '\\'
  });

  var getRealIndex = function(index) {
    var realIndex = index;
    recursive.forEach(function(replace) {
      var start = replace.start - 1;
      var end = replace.end + 1;
      if (start < realIndex) {
        realIndex += end - start;
      }
    });
    return realIndex;
  };

  var ret = str;
  recursive.forEach(function(match) {
    replaces.push(match);
    ret = ret.replace('{' + match.name + '}', '{}');
  });

  ret = ret.split('{}');

  return {
    replaces: replaces,
    ret: ret
  };
};

module.exports = {
  parse: parse
};
