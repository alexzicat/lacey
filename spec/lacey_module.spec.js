// TESTS FOR THE 'lacey_app.js' FILE
describe('LaceyModule', function () {
  var app,
    instance;

  beforeAll(function () {
    app = new LaceyApp('app');
  });

  describe('When the module is initializable', function () {
    beforeAll(function () {
      app.register_module('initializable_module', function () {
        this.initialize = function () {
          console.log('initializable');
        };
      });

      instance = app.initializable_module.get_instance();
    });

    describe("When the module contains an uncalled 'initialize' function", function () {
      it('should allow to initialize the module', function () {
        spyOn(instance, 'initialize');
        app.initializable_module.initialize();

        expect(instance.initialize).toHaveBeenCalled();
        expect(app.initializable_module.initialized).toBe(true);
      });
    });

    describe("When the module contains an already called 'initialize' function", function () {
      it('should not initialize the module', function () {
        spyOn(instance, 'initialize');
        app.initializable_module.initialize();

        expect(instance.initialize).not.toHaveBeenCalled();
        expect(app.initializable_module.initialized).toBe(true);
      });
    });
  });

  describe('When the module is not initializable', function () {
    describe("When the module contains no 'initialize' function", function () {
      beforeAll(function () {
        app.register_module('not_initializable_module', function () {
          this.name = 'not initializable';
        });

        instance = app.not_initializable_module.get_instance();
      });

      it('should not initialize the module', function () {
        app.not_initializable_module.initialize();

        expect(app.not_initializable_module.initialized).toBe(false);
      });
    });

    describe("When the module contains an 'initialize' attribute that is not a function", function () {
      beforeAll(function () {
        app.register_module('initialize_not_function_module', function () {
          this.initialize = '';
        });

        instance = app.initialize_not_function_module.get_instance();
      });

      it('should not initialize the module', function () {
        app.initialize_not_function_module.initialize();

        expect(app.initialize_not_function_module.initialized).toBe(false);
      });
    });
  });
});
