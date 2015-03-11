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


  recursive = XRegExp.matchRecursive(str, '\\/\\*', '\\*\\/', 'g', {
    valueNames: [null, null, 'value', null],
    escapeChar: '\\'
  });

  var keyframes = [];
  XRegExp.forEach(ret, /@(-[a-z]+-)?keyframes .*?\{[\s\S]+}\s*}/, function (match, i) {
    keyframes.push({
      index: match.index,
      name: match[0]
    });
  });

  var medias = [];
  XRegExp.forEach(ret, /@media.*?\{/, function (match, i) {
    medias.push({
      index: match.index,
      name: match[0]
    });
  });

  var doubleBrackets = [];
  XRegExp.forEach(ret, /}\s*}/, function (match, i) {
    doubleBrackets.push({
      index: match.index,
      name: match[0]
    });
  });

  ret = ret.replace(/@(-[a-z]+-)?keyframes .*?\{[\s\S]+}\s*}/g, '@keyframes []');
  ret = ret.replace(/@media.*?\{/g, '@media [');
  ret = ret.replace(/}\s*}/g, '}]');

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
    doubleBrackets: doubleBrackets,
    keyframes: keyframes,
    medias: medias,
    comments: comments,
    replaces: replaces,
    ret: ret
  };
};

module.exports = {
  parse: parse
};
