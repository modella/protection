var modella = require('modella'),
    clone = modella.utils.clone;

module.exports = function(Model) {
  var OldModel = Model;

  function filterAttrs(attrs) {
    var newAttrs = clone(attrs), allowInsert;
    for(var attr in attrs) {
      if(Model.whiteListProtection)
        allowInsert = Model.attrs[attr] && Model.attrs[attr].protected === false;
      else
        allowInsert = Model.attrs[attr] && Model.attrs[attr].protected !== true;

      if(!allowInsert)
        delete newAttrs[attr];
    }
    return newAttrs;
  }

  Model.whiteListProtection = false;

  Model.prototype.filteredSet = function(attrs) {
    attrs = filterAttrs(attrs);
    return this.set(attrs);
  };
};

