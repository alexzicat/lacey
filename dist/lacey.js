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

var LaceyApp,
  LaceyModule,
  LaceyAbstactModule,
  modules,
  validate_app_name,
  validate_duplicated_module,
  validate_module_name,
  validate_module_type,
  validate_parent_module_name;

LaceyApp = function (app_name) {
  validate_app_name.call(this, app_name);

  this.modules = [];
  this.name = app_name;
  modules = {};

  return this;
};

LaceyApp.prototype.register_module = function (module_name, parent_module, Module) {
  if (typeof parent_module === 'function') {
    Module = parent_module;
    parent_module = null;
  }

  validate_module_name.call(this, module_name);
  validate_module_type.call(this, Module);
  validate_duplicated_module.call(this, module_name);

  this[module_name] = new LaceyModule(module_name, parent_module, Module);
  this.modules.push(module_name);
  modules[module_name] = Module;

  return this[module_name];
};

LaceyApp.prototype.register_abstract_module = function (module_name, Module) {
  validate_module_name.call(this, module_name);
  validate_module_type.call(this, Module);
  validate_duplicated_module.call(this, module_name);

  this[module_name] = new LaceyAbstactModule(module_name, Module);
  this.modules.push(module_name);
  modules[module_name] = Module;

  return this[module_name];
};

LaceyApp.prototype.unregister_module = function (module_name) {
  validate_module_name.call(this, module_name);

  this[module_name] = null;
  modules[module_name] = null;

  delete this[module_name];
  delete modules[module_name];

  return this;
};

validate_app_name = function (app_name) {
  if (typeof app_name !== 'string' || app_name === '') {
    throw 'InvalidNameError - you must give a valid name to your lacey app';
  }

  return true;
};

validate_module_name = function (module_name) {
  if (typeof module_name !== 'string' || module_name === '') {
    throw 'InvalidModuleNameError - you must give a valid name to your module';
  }

  return true;
};

validate_module_type = function (Module) {
  if (typeof Module !== 'function') {
    throw 'InvalidModuleError - your module must be a function';
  }

  return true;
};

validate_duplicated_module = function (module_name) {
  if (this.modules.indexOf(module_name) !== -1) {
    throw 'DuplicateModuleError - your module has already been registered';
  }

  return true;
};

LaceyModule = function (module_name, parent_module, Module) {
  var instance = null;

  this.initialized = false;
  this.module_name = module_name;

  this.get_instance = function () {
    if (instance === null) {
      if (parent_module !== null && parent_module !== module_name) {
        validate_parent_module_name.call(this, parent_module);
        Module.inherits_from(modules[parent_module]);
      }

      instance = new Module();
    }

    return instance;
  };

  return this;
};

LaceyModule.prototype.initialize = function () {
  var instance = this.get_instance();

  if (!this.initialized && typeof instance.initialize === 'function') {
    instance.initialize();
    this.initialized = true;
  }

  return instance;
};

LaceyModule.prototype.is_abstract = false;

validate_parent_module_name = function (parent_module) {
  if (typeof modules[parent_module] === 'undefined') {
    throw 'InvalidParentModuleError - the parent module does not exist';
  }

  return true;
};

LaceyAbstactModule = function () {
  this.get_instance = function () {
    throw 'InvalidAbstractModuleMethod - an abstract module does not have an instance';
  };

  this.initialize = function () {
    throw 'InvalidAbstractModuleMethod - an abstract module can not be initialized';
  };

  this.initialized = false;
  this.is_abstract = true;
};

LaceyAbstactModule.inherits_from(LaceyModule);

window.LaceyApp = LaceyApp;
