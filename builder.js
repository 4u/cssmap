var XRegExp = require('xregexp').XRegExp;
var CSS_CLASS_REGEXP = require('./resourses').CSS_CLASS_REGEXP;
var CSS_CLASS_SEPARATOR = require('./resourses').CSS_CLASS_SEPARATOR;

var re = new XRegExp(CSS_CLASS_REGEXP);

var build = function(parsedData, map, byWhole) {
  parsedData.ret.forEach(function(str, pos) {
    var tokens = [];

    XRegExp.forEach(str, re, function(match, i) {
      var newCssClass = [];
      var arr = byWhole ? [match[1]] : match[1].split(CSS_CLASS_SEPARATOR);
      arr.forEach(function(str) {
        newCssClass.push(map[str] || str);
      });
      newCssClass = newCssClass.join(CSS_CLASS_SEPARATOR);

      tokens.push({
        orig: '.' + match[1],
        repl: '.' + newCssClass
      });
    });

    tokens.forEach(function(token) {
      parsedData.ret[pos] = parsedData.ret[pos].replace(token.orig, token.repl);
    });
  });

  var ret = '';

  parsedData.ret.forEach(function(str, pos) {
    if (pos > 0) {
      ret += '{' + parsedData.replaces[pos - 1].name  + '}';
    }
    ret += str;
  });

  parsedData.medias.forEach(function(match) {
    ret = ret.replace('@media [', match.name);
  });

  parsedData.keyframes.forEach(function(match) {
    ret = ret.replace('@keyframes []', match.name);
  });

  parsedData.doubleBrackets.forEach(function(match) {
    ret = ret.replace('}]', match.name);
  });

  parsedData.comments.forEach(function(match) {
    ret = ret.replace('/* ... */', '/*' + match.name + '*/');
  });

  return ret;
};

module.exports = {
  build: build
};
