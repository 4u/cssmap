var XRegExp = require('xregexp').XRegExp;
var CSS_CLASS_REGEXP = require('./resourses').CSS_CLASS_REGEXP;
var CSS_CLASS_SEPARATOR = require('./resourses').CSS_CLASS_SEPARATOR;

var re = new XRegExp(CSS_CLASS_REGEXP);

var build = function(parsedData, map) {
  parsedData.ret.forEach(function(str, pos) {
    var tokens = [];

    XRegExp.forEach(str, re, function(match, i) {
      var newCssClass = [];
      match[1].split(CSS_CLASS_SEPARATOR).forEach(function(str) {
        newCssClass.push(map[str]);
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

  return ret;
};

module.exports = {
  build: build
};
