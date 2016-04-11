describe('Object', function () {
  describe("When calling the 'inherits_from function'", function () {
    var ChildObject;

    beforeAll(function () {
      ChildObject = function () {
        this.name = 'alex';
      };
    });

    describe('When the Object instance does not inherit from another Object', function () {
      var object;

      beforeAll(function () {
        object = new ChildObject();
      });

      it('should not be a child', function () {
        expect(object.is_child).toBe(false);
      });

      it('should not have a parent', function () {
        expect(object.has_parent).toBe(false);
      });

      it('should not have the parent prototype accessible', function () {
        expect(object.parent).toBe(undefined);
      });

      it("should have an attribute 'name' that returns 'alex'", function () {
        expect(object.name).toBe('alex');
      });

      it("should not have an attribute 'age'", function () {
        expect(object.age).not.toBeDefined();
      });
    });

    describe('When the Object instance inherits from another Object', function () {
      describe('Without receiving parameters', function () {
        var ParentObject,
          object,
          parent_object;

        beforeAll(function () {
          ParentObject = function () {
            this.age = 29;
          };

          ChildObject.inherits_from(ParentObject);

          object = new ChildObject();
        });

        it('should be a child', function () {
          expect(object.is_child).toBe(true);
        });

        it('should have a parent', function () {
          expect(object.has_parent).toBe(true);
        });

        it('should have the parent prototype accessible', function () {
          expect(object._super).toEqual(new ParentObject());
        });

        it("should have an attribute 'name' that returns 'alex'", function () {
          expect(object.name).toBe('alex');
        });

        it("should have an attribute 'age' that returns 29", function () {
          expect(object.age).toBe(29);
        });
      });

      describe('With parameters', function () {
        beforeAll(function () {
          ParentObject = function (age) {
            this.age = age;
          };

          ChildObject.inherits_from(ParentObject, 30);

          object = new ChildObject();
        });

        it('should be a child', function () {
          expect(object.is_child).toBe(true);
        });

        it('should have a parent', function () {
          expect(object.has_parent).toBe(true);
        });

        it('should have the parent prototype accessible', function () {
          expect(object._super).toEqual(new ParentObject(30));
        });

        it("should have an attribute 'name' that returns 'alex'", function () {
          expect(object.name).toBe('alex');
        });

        it("should have an attribute 'age' that returns 30", function () {
          expect(object.age).toBe(30);
        });
      });
    });
  });
});
