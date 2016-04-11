var object_prototype = Object.prototype;

Object.defineProperties(object_prototype, {
  'has_parent': {
    value: false,
    writable: true,
    enumerable: false
  },

  'is_child': {
    value: false,
    writable: true,
    enumerable: false
  },

  'inherits_from': {
    value: function (klass) {
      var KlassPrototype = Function.bind.apply(klass, arguments);

      this.prototype = new KlassPrototype();
      this.prototype._super = new KlassPrototype();
      this.prototype.constructor = this;
      this.prototype.is_child = this.prototype.has_parent = true;
    },
    writable: false,
    enumerable: false,
    configurable: false
  }
});
