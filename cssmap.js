var resourses = require('./resourses');
var Parser = require('./parser');
var Frequency = require('./frequency');
var Map = require('./map');
var Builder = require('./builder');

var CssMap = function(data) {
  this._data = data;
  this._symbols = CssMap.getDefaultMapSymbols();
};

CssMap.getDefaultMapSymbols = function() {
  return resourses.MAP_SYMBOLS;
};

CssMap.prototype.setMapSymbols = function(symbols) {
  this._symbols = symbols;
};

CssMap.prototype.compile = function() {
  var parsedData = Parser.parse(this._data);
  this._frequency = Frequency.get(parsedData);
  this._map = Map.create(this._frequency, this._symbols);
  this._result = Builder.build(parsedData, this._map);
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

CssMap.prototype.getResult = function() {
  return this._result;
};

module.exports = CssMap;
