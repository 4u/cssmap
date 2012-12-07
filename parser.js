var XRegExp = require('xregexp').XRegExp;

var parse = function(str, opt_excludes) {
  var replaces = [];
  var comments = [];

  var recursive = XRegExp.matchRecursive(str, '\\/\\*', '\\*\\/', 'g', {
    valueNames: [null, null, 'value', null],
    escapeChar: '\\'
  });

  var ret = str;
  recursive.forEach(function(match) {
    comments.push(match);
    ret = ret.replace('/*' + match.name + '*/', '/* ... */');
  });

  recursive = XRegExp.matchRecursive(ret, '{', '}', 'g', {
    valueNames: [null, null, 'value', null],
    escapeChar: '\\'
  });

  recursive.forEach(function(match) {
    replaces.push(match);
    ret = ret.replace('{' + match.name + '}', '{}');
  });

  ret = ret.split('{}');

  return {
    comments: comments,
    replaces: replaces,
    ret: ret
  };
};

module.exports = {
  parse: parse
};
