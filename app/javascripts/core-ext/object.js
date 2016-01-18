Object.prototype.has_parent = Object.prototype.is_child = false;

Object.prototype.inherits_from = function (klass) {
  this.prototype = new (Function.bind.apply(klass, arguments))();
  this.prototype.constructor = this;
  this.prototype.is_child = this.prototype.has_parent = true;
};
