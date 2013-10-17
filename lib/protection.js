var modella = require('modella'),
    clone = modella.utils.clone;

module.exports = function(Model) {
  var OldModel = Model;

  function filterAttrs(attrs, permissionMap) {
    var newAttrs = clone(attrs), allowInsert;
    for(var attr in attrs) {
      var protect;
      if(permissionMap[attr]) {
        if(typeof permissionMap[attr] == 'boolean')
          protect = permissionMap[attr];
        else
          protect = permissionMap[attr].protected;

        if(typeof protect == 'object') {
          if(Array.isArray(newAttrs[attr]))
             newAttrs[attr] = newAttrs[attr].map(function(a) { return filterAttrs(a, protect) });
           else
             newAttrs[attr] = filterAttrs(attrs, protect);
        } else {

          if(Model.whiteListProtection) {
            allowInsert = protect === false;
          } else {
            allowInsert = protect !== true;
          }
          if(allowInsert === false)
            delete newAttrs[attr];
        }
      }
    }
    return newAttrs;
  }

  Model.whiteListProtection = false;

  Model.prototype.protectedSet = function(attrs) {
    attrs = filterAttrs(attrs, Model.attrs);
    this.set(attrs);
    return attrs;
  };
};

