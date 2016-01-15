(function () {
  'use strict';

  var LaceyApp,
    LaceyModule,
    modules,
    validate_app_name,
    validate_module_name,
    validate_module_type,
    validate_duplicated_module,
    validate_parent_module_name;

  LaceyApp = function (app_name) {
    validate_app_name.call(this, app_name);

    modules = {};
    this.modules = [];
    this.name = app_name;

    return this;
  };

  LaceyApp.prototype.register_module = function (module_name, parent_module, Module) {
    if (parent_module.is_a('function')) {
      Module = parent_module;
      parent_module = null;
    }

    validate_module_name.call(this, module_name);
    validate_module_type.call(this, Module);
    validate_duplicated_module.call(this, module_name);

    modules[module_name] = Module;
    this[module_name] = new LaceyModule(module_name, parent_module, Module);
    this.modules.push(module_name);

    return this[module_name];
  };

  LaceyApp.prototype.unregister_module = function (module_name) {
    validate_module_name.call(this, module_name);

    modules[module_name] = null;
    this[module_name] = null;

    return this;
  };

  LaceyModule = function (module_name, parent_module, Module) {
    var instance = null;

    this.initialized = false;
    this.module_name = module_name;

    this.get_instance = function () {
      if (instance === null) {
        if (parent_module !== null) {
          validate_parent_module_name.call(this, parent_module);
          Module.inherits_from(modules[parent_module]);
        }

        instance = new Module();
      }

      return instance;
    };
  };

  LaceyModule.prototype.initialize = function () {
    var instance = this.get_instance();

    if (!this.initialized && typeof instance.initialize !== 'undefined' && instance.initialize.is_a('function')) {
      instance.initialize();
      this.initialized = true;
    }

    return instance;
  };

  validate_app_name = function (app_name) {
    if (!app_name.is_a('string') || app_name === '') {
      throw 'InvalidNameError - you must give a valid name to your lacey app';
    }

    return true;
  };

  validate_module_name = function (module_name) {
    if (!module_name.is_a('string') || module_name === '') {
      throw 'InvalidModuleNameError - you must give a valid name to your module';
    }

    return true;
  };

  validate_module_type = function (Module) {
    if (!Module.is_a('function')) {
      throw 'InvalidModuleError - your module must be a function';
    }

    return true;
  };

  validate_duplicated_module = function (module_name) {
    if (this.modules[module_name] !== undefined) {
      throw 'DuplicateModuleError - your module has already been registered';
    }

    return true;
  };

  validate_parent_module_name = function (parent_module) {
    if (modules[parent_module] === null || modules[parent_module] === 'undefined') {
      throw 'InvalidParentModule - the parent module does not exist';
    }

    return true;
  };

  Array.prototype.flatten = function () {
    return [].concat.apply([], this);
  };

  Object.prototype.has_parent = Object.prototype.is_child = false;

  Object.prototype.inherits_from = function (klass) {
    this.prototype = new (Function.bind.apply(klass, arguments))();
    this.prototype.constructor = this;
    this.prototype.is_child = this.prototype.has_parent = true;
  };

  Object.prototype.is_a = function (args) {
    var i,
      type,
      types = [args].flatten(),
      size = types.length;

    for (i = 0; i < size; i += 1) {
      type = types[i];

      if (typeof type !== 'string') {
        throw 'Invalid type. Argument must be a string';
      }

      if (typeof this === type) {
        return true;
      }
    }

    return false;
  };

  window.LaceyApp = LaceyApp;
}());
