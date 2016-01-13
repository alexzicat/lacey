(function () {
  'use strict';

  var LaceyModule, validate_app_name, validate_module_name, validate_module_type, validate_duplicated_module;

  LaceyApp = function (app_name) {
    validate_app_name(app_name);

    this.modules = {};
    this.name = app_name;

    return this;
  };

  LaceyApp.prototype.register_module = function (module_name, module) {
    validate_module_name.call(this, module_name);
    validate_module_type.call(this, module);
    validate_duplicated_module.call(this, module_name);

    this.modules[module_name] = module;

    this[module_name] = new LaceyModule(module_name, module);
  };

  // private

  LaceyModule = function (module_name, module) {
    this.instance = null;
    this.module = module;
    this.module_name = module_name;
  };

  LaceyModule.prototype.get_instance = function () {
    if (this.instance === null) {
      this.instance = new this.module();
    }

    return this.instance;
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
  };

  validate_module_name = function (module_name) {
    if (typeof module_name !== 'string' || module_name === '') {
      throw 'InvalidModuleNameError - you must give a valid name to your module';
    }
  };

  validate_module_type = function (module) {
    if (typeof module !== 'function') {
      throw 'InvalidModuleError - your module must be a function';
    }
  };

  validate_duplicated_module = function (module_name) {
    if (this.modules[module_name] !== undefined) {
      throw 'DuplicateModuleError - your module has already been registered';
    }
  };
}());
