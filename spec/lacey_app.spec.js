// TESTS FOR THE 'lacey_app.js' FILE
describe('LaceyApp', function () {

  var app;

  // CREATING A NEW APP
  describe('Creating a new app', function () {
    describe('With a valid name', function () {
      beforeAll(function () {
        app = new LaceyApp('app');
      });

      it('should create a new app', function () {
        expect(app.name).toBe('app');
        expect(app.modules).toEqual([]);
      });
    });

    describe('With a name that is not a String', function () {
      beforeAll(function () {
        app = function () {
          new LaceyApp(0);
        };
      });

      it('should throw an InvalidNameError', function () {
        expect(app).toThrow('InvalidNameError - you must give a valid name to your lacey app');
      });
    });

    describe('With a name that is an empty String', function () {
      beforeAll(function () {
        app = function () {
          new LaceyApp('');
        };
      });

      it('should throw an InvalidNameError', function () {
        expect(app).toThrow('InvalidNameError - you must give a valid name to your lacey app');
      });
    });
  });

  // MODULE REGISTRATION
  describe('Registering a new module', function () {
    var module,
      instance;

    beforeAll(function () {
      app = new LaceyApp('app');
    });

    describe('With a valid name, code and without inheritance', function () {
      beforeAll(function () {
        app.register_module('valid_module', function () {
          this.name = 'a valid module';

          this.initialize = function () {
            console.log('initialize');
          };
        });

        instance = app.valid_module.get_instance();
      });

      it('should add the module to the app', function () {
        expect(app.valid_module).toBeDefined();
      });

      it('should create an instance of the module', function () {
        expect(instance.name).toBe('a valid module');
      });

      it('should act as a singleton', function () {
        var instance2 = app.valid_module.get_instance();

        expect(instance).toBe(instance2);
      });
    });

    describe('With a valid name, code and with inheritance', function () {
      var instance;

      beforeAll(function () {
        app.register_module('child_module', 'valid_module', function () {
          this.other_name = 'the child module';
          this.initialize = function () {
            console.log('initialize');
          };
        });

        instance = app.child_module.get_instance();
      });

      it('should add the module to the app', function () {
        expect(app.valid_module).toBeDefined();
        expect(app.child_module).toBeDefined();
      });

      it('should create an instance of the module', function () {
        expect(instance.other_name).toBe('the child module');
      });

      it('should act as a singleton', function () {
        var instance2 = app.child_module.get_instance();

        expect(instance).toBe(instance2);
      });

      it('should be able to use the parent module attributes', function () {
        expect(instance.name).toBe('a valid module');
      });
    });

    describe('With a name that is not a String', function () {
      beforeAll(function () {
        module = function () {
          app.register_module(0, function () {
            this.name = 'not a String';
          });
        };
      });

      it('should throw an InvalidModuleNameError', function () {
        expect(module).toThrow('InvalidModuleNameError - you must give a valid name to your module');
      });
    });

    describe('With a name that is an empty String', function () {
      beforeAll(function () {
        module = function () {
          app.register_module('', function () {
            this.name = 'an empty String';
          });
        };
      });

      it('should throw an InvalidModuleNameError', function () {
        expect(module).toThrow('InvalidModuleNameError - you must give a valid name to your module');
      });
    });

    describe('Without the module code', function () {
      beforeAll(function () {
        module = function () {
          app.register_module('module_with_no_code');
        };
      });

      it('should throw an InvalidModuleError', function () {
        expect(module).toThrow('InvalidModuleError - your module must be a function');
      });
    });

    describe('With module code that is not a Function', function () {
      beforeAll(function () {
        module = function () {
          app.register_module('module_with_code_not_function', 111);
        };
      });

      it('should throw an InvalidModuleError', function () {
        expect(module).toThrow('InvalidModuleError - your module must be a function');
      });
    });

    describe('With a duplicate name', function () {
      beforeAll(function () {
        module = function () {
          app.register_module('valid_module', function () {
            this.name = 'duplicate valid module';
          });
        };
      });

      it('should throw a DuplicateModuleError', function () {
        expect(module).toThrow('DuplicateModuleError - your module has already been registered');
      });
    });

    describe('With a parent module that does not exist', function () {
      beforeAll(function () {
        module = function () {
          app.register_module('invalid_parent_module', 'inexistant_module', function () {
            this.name = 'inexistant module';
          });

          app.invalid_parent_module.get_instance();
        };
      });

      it('should throw an InvalidParentModuleError', function () {
        expect(module).toThrow('InvalidParentModuleError - the parent module does not exist');
      });
    });
  });

  // MODULE UNREGISTRATION
  describe('Unregistering a module', function () {
    var unregistering;

    describe('With a valid module name', function () {
      beforeAll(function () {
        app.unregister_module('valid_module');
      });

      it('should not be remove the module from the app', function () {
        expect(app.valid_module).not.toBeDefined();
      });

    });

    describe('With a name that is not a String', function () {
      beforeAll(function () {
        unregistering = function () {
          app.unregister_module(0);
        };
      });

      it('should throw an InvalidModuleNameError', function () {
        expect(unregistering).toThrow('InvalidModuleNameError - you must give a valid name to your module');
      });
    });

    describe('With a name that is an empty String', function () {
      beforeAll(function () {
        module = function () {
          unregistering = function () {
            app.unregister_module('');
          };
        };
      });

      it('should throw an InvalidModuleNameError', function () {
        expect(unregistering).toThrow('InvalidModuleNameError - you must give a valid name to your module');
      });
    });
  });
});
