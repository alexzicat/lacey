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
      this.prototype = new (Function.bind.apply(klass, arguments))();
      this.prototype.constructor = this;
      this.prototype.is_child = this.prototype.has_parent = true;
    }
  }
});
