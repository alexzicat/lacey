Array.prototype.flatten = function () {
  [].concat.apply([], this);
};
