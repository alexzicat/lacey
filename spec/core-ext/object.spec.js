describe('Object :: ', function () {
  describe('inherits_from :: ', function () {
    var ChildObject = function () {
      this.name = 'alex';
    };

    describe('When the Object instance does not inherit from another Object :: ', function () {
      var object = new ChildObject();

      it('is not a child', function () {
        expect(object.is_child).toBe(false);
      });

      it('is does not have a parent', function () {
        expect(object.has_parent).toBe(false);
      });

      it("has an attribute name that returns 'alex'", function () {
        expect(object.name).toBe('alex');
      });

      it('does not have an attribute age', function () {
        expect(object.age).not.toBeDefined();
      });
    });

    describe('When the Object instance inherits from another Object ::', function () {
      describe('without params :: ', function () {
        var ParentObject = function () {
          this.age = 29;
        };

        ChildObject.inherits_from(ParentObject);

        var object = new ChildObject();

        it('is a child', function () {
          expect(object.is_child).toBe(true);
        });

        it('has a parent', function () {
          expect(object.has_parent).toBe(true);
        });

        it("has an attribute name that returns 'alex'", function () {
          expect(object.name).toBe('alex');
        });

        it("has an attribute age that returns 29", function () {
          expect(object.age).toBe(29);
        });
      });

      describe('with params :: ', function () {
        var ParentObject = function (age) {
          this.age = age;
        };

        ChildObject.inherits_from(ParentObject, 30);

        var object = new ChildObject();

        it('is a child', function () {
          expect(object.is_child).toBe(true);
        });

        it('has a parent', function () {
          expect(object.has_parent).toBe(true);
        });

        it("has an attribute name that returns 'alex'", function () {
          expect(object.name).toBe('alex');
        });

        it("has an attribute age that returns 30", function () {
          expect(object.age).toBe(30);
        });
      });
    });
  });
});
