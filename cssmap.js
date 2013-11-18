var resourses = require('./resourses');
var Parser = require('./parser');
var Frequency = require('./frequency');
var Map = require('./map');
var Builder = require('./builder');
var CSS_CLASS_SEPARATOR = require('./resourses').CSS_CLASS_SEPARATOR;

var CssMap = function() {
  this._byWhole = false;
  this._files = [];
  this._symbols = CssMap.getDefaultMapSymbols();
};

CssMap.getDefaultMapSymbols = function() {
  return resourses.MAP_SYMBOLS;
};

CssMap.prototype.setExcludes = function(excludes) {
  this._excludes = excludes;
};

CssMap.prototype.getExcludes = function() {
  var ret = {};
  this._excludes.forEach(function(exclude) {
    var arr = this._byWhole ? [exclude] : exclude.split(CSS_CLASS_SEPARATOR);
    arr.forEach(function(chunk) {
      ret[chunk] = true;
    });
  }, this);
  return Object.keys(ret);
};

CssMap.prototype.enableByWholeStyle = function(enable) {
  this._byWhole = enable;
};
CssMap.prototype.hasWholeStyle = function() {
  return this._byWhole;
};

CssMap.prototype.getStyle = function() {
  return this._byWhole ? 'BY_WHOLE' : 'BY_PART';
};

CssMap.prototype.addFile = function(fileData) {
  this._files.push({
    data: fileData
  });
};

CssMap.prototype.setMapSymbols = function(symbols) {
  this._symbols = symbols;
};

CssMap.prototype.compile = function() {
  this._files.forEach(function(file) {
    file.parsedData = Parser.parse(file.data);
    file.frequency = Frequency.get(file.parsedData, this._byWhole);
  }, this);

  this._frequency = this._files.reduce(function(r, file, i, arr) {
    return Frequency.merge(r, file.frequency);
  }, {});

  this._map = Map.create(this._frequency, this._symbols);
  this.getExcludes().forEach(function(key) {
    delete this._map[key];
  }, this);

  this._files.forEach(function(file) {
    file.result = Builder.build(file.parsedData, this._map, this._byWhole);
  }, this);
};

CssMap.prototype.getMapSymbols = function() {
  return this._symbols;
};

CssMap.prototype.getMap = function() {
  return this._map;
};

CssMap.prototype.getFrequency = function() {
  return this._frequency;
};

CssMap.prototype.getFiles = function() {
  return this._files;
};

module.exports = CssMap;
