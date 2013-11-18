var resourses = require('./resourses');
var Parser = require('./parser');
var Frequency = require('./frequency');
var Map = require('./map');
var Builder = require('./builder');

var CssMap = function() {
  this._files = [];
  this._symbols = CssMap.getDefaultMapSymbols();
};

CssMap.getDefaultMapSymbols = function() {
  return resourses.MAP_SYMBOLS;
};

CssMap.prototype.setExcludes = function(excludes) {
  this._excludes = excludes;
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
    file.frequency = Frequency.get(file.parsedData);
  }, this);

  this._frequency = this._files.reduce(function(r, file, i, arr) {
    return Frequency.merge(r, file.frequency);
  }, {});

  this._map = Map.create(this._frequency, this._symbols);
  (this._excludes || []).forEach(function(key) {
    delete this._map[key];
  }, this);

  this._files.forEach(function(file) {
    file.result = Builder.build(file.parsedData, this._map);
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
