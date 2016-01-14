(function () {
  'use strict';

  var LaceyApp,
    LaceyModule,
    modules,
    validate_app_name,
    validate_module_name,
    validate_module_type,
    validate_duplicated_module;

  LaceyApp = function (app_name) {
    validate_app_name.call(this, app_name);

    modules = this.modules = {};
    this.name = app_name;

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
    this.modules[module_name] = Module;

    return this[module_name];
  };

  LaceyModule = function (module_name, parent_module, Module) {
    var instance = null;

    this.module_name = module_name;

    this.get_instance = function () {
      if (instance === null) {
        if (parent_module !== null) {
          Module.prototype = new modules[parent_module]();
          Module.prototype.constructor = Module;
        }

        instance = new Module();
      }

      return instance;
    };
  };

  LaceyModule.prototype.initialize = function () {
    if (this.instance === null) {
      var module = this.get_instance();

      if (typeof module.initialize === 'function') {
        module.initialize();
      }
    }

    return this.instance;
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
    if (this.modules[module_name] !== undefined) {
      throw 'DuplicateModuleError - your module has already been registered';
    }

    return true;
  };

  window.LaceyApp = LaceyApp;
}());
