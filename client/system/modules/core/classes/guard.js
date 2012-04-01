/**
 * A collection of functions to enforce certain rules over arguments.
 *
 * @module guard
 */

define('guard', ['underscore', 'i18n', 'exceptions'],
/**
 * @requires module:underscore
 * @requires module:i18n
 * @requires module:exceptions
 */
function(_, I18n, Exceptions) {
  return {
    /**
     * Check if a given argument is of the expected type or throw an error otherwise.
     *
     * @param {String} callee The callee of the method, used in the error message.
     * @param {String} name The argument name in the callee method, used in the error message.
     * @param {Object} object The object whose type is being checked.
     * @param {String} type The expected type, e.g., <code>Object</code>.
     * @throws {module:exceptions~ArgumentException} If the type of <code>object</code> is not the expected one.
     */
    expectType: function(callee, name, object, type) {
      if (_.isObject(type)) {
        if ( ! _.isObject(object) || ! (object.prototype instanceof type)) {
          throw new (Exceptions.TypeException)(I18n.format("':callee' expects ':name' to be of type ':type'.", {
            ':callee': callee,
            ':name': name,
            ':type': (type.name || type.constructor.name || type.toString())
          }), 1329505529);
        }
      } else if ( ! _['is' + type](object)) {
        throw new (Exceptions.ArgumentException)(I18n.format("':callee' expects ':name' to be of type ':type'.", {
          ':callee': callee,
          ':name': name,
          ':type': type
        }), 1329505522);
      }
      return this;
    },
    /**
     * Check if a given hash contains all expected keys or throw an error otherwise.
     *
     * <p><code>expected</code> is a hash of <code>{ key: value }</code> pairs
     * where each <code>key</code> must be present in <code>object</code>. Optionally,
     * <code>value</code> may be an object in which case the target must be an instance of it.</p>
     *
     * @param {String} callee The callee of the method, used in the error message.
     * @param {String} name The argument name in the callee method, used in the error message.
     * @param {Object} object The object whose keys (and optionally values) are being checked.
     * @param {Array} expected The list of keys/values that are expected to be in the hash.
     * @throws {module:exceptions~ArgumentException} If any of the expected keys was not present in <code>object</code>.
     * @throws {module:exceptions~TypeException} If any of the values in <code>object</code> was not of an expected instance.
     */
    expectHash: function(callee, name, object, expected) {
      this.expectType(callee, name, object, 'Object');
      var self = this;
      _.each(expected, function(value, key) {
        if ( ! (key in object)) {
          throw new (Exceptions.ArgumentException)(I18n.format("':callee' expects ':name' to have a value for ':key'.", {
            ':callee': callee,
            ':name': name,
            ':key': key,
          }), 1329505525);
        }
        if (_.isObject(value)) {
          self.expectType(callee, name + '[' + key + ']', object[key], value);
        }
      });
      return this;
    }
  };

  return Guard;
});
