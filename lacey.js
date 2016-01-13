(function () {
  LaceyApp = function (app_name) {
    validate_app_name(app_name);

    this.name = app_name;
    this.modules = {};

    return this;
  };

  LaceyApp.prototype.register_module = function (module_name, module) {
    validate_module_name(module_name);
    validate_module_type(module);
    validate_duplicated_module(module_name);

    this.modules[module_name] = module;
  };

  var validate_app_name = function (app_name) {
    if (typeof app_name !== 'string' || app_name == '') {
      throw 'InvalidNameError - you must give a valid name to your lacey app';
    }
  };

  var validate_module_name = function (module_name) {
    if (typeof module_name !== 'string' || module_name == '') {
      throw 'InvalidModuleNameError - you must give a valid name to your module';
    }
  };

  var validate_module_type = function (module) {
    if (typeof module !== 'function') {
      throw 'InvalidModuleError - your module must be a function';
    }
  };

  var validate_duplicated_module = function (module_name) {
    if (this.modules[module_name] !== undefined) {
      throw 'DuplicateModuleError - your module has already been registered';
    }
  };
})
