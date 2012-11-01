var XRegExp = require('xregexp').XRegExp;
var CSS_CLASS_REGEXP = require('./resourses').CSS_CLASS_REGEXP;
var CSS_CLASS_SEPARATOR = require('./resourses').CSS_CLASS_SEPARATOR;

var re = new XRegExp(CSS_CLASS_REGEXP);

var get = function(parsedData) {
  var frequency = {};

  parsedData.ret.forEach(function(str, pos) {
    XRegExp.forEach(str, re, function(match, i) {
      match[1].split(CSS_CLASS_SEPARATOR).forEach(function(str) {
        if (!frequency[str]) {
          frequency[str] = 0;
        }
        frequency[str]++;
      });
    });
  });

  return frequency;
};

var merge = function(freq1, freq2) {
  var ret = {};
  var name;

  for (name in freq1) {
    if (!ret[name]) {
      ret[name] = freq1[name];
    } else {
      ret[name] += freq1[name];
    }
  }

  for (name in freq2) {
    if (!ret[name]) {
      ret[name] = freq2[name];
    } else {
      ret[name] += freq2[name];
    }
  }

  return ret;
};

module.exports = {
  get: get,
  merge: merge
};