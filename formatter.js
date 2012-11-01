var format = function(map, format) {
  if (format == 'CLOSURE_UNCOMPILED') {
    return closureUncompiled(map);
  }

  return closureCompiled(map);
};

var closureCompiled = function(map) {
  return 'goog.setCssNameMapping(' +
    JSON.stringify(map, null, 2) +
  ');\n';
};

var closureUncompiled = function(map) {
  return 'CLOSURE_CSS_NAME_MAPPING = ' +
    JSON.stringify(map, null, 2) +
  ';\n';
};

module.exports = {
  format: format,
  closureCompiled: closureCompiled,
  closureUncompiled: closureUncompiled
};