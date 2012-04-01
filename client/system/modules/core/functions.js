/**
 * Define a module with optional dependencies.
 *
 * @function
 * @param {String} id Optional module ID. If this is omitted, no module is defined and instead <code>factory</code> is called immediately.
 * @param {Array} dependencies Optional list of module IDs on which this module depends.
 * @param {Function} factory The module body. The function is called with arguments matching the given dependencies, if any.
 * @return {Function} The module body with dependencies injected.
 */
var define = (function() {
  /** @private */
  var __evaluate = {};
  /**
   * Get a reference to a single module.
   *
   * <p>The function is available when explicitly specified in a dependency list.</p>
   *
   * @param {String} module The module ID.
   * @return {Object} A reference to the module.
   */
  var require = function(id) {
    if (typeof (id) === 'string') {
      return (define([id], function(module) {
        return module;
      }))();
    }
    return define.apply(define, arguments);
  };
  return function(id, dependencies, factory) {
    if (typeof (factory) === 'undefined') {
      factory = dependencies;
      dependencies = null;
    }
    if (typeof (id) !== 'string') {
      dependencies = id;
      id = null;
    }
    dependencies || (dependencies = []);
    if ( ! dependencies.length && factory.length) {
      dependencies = ['require', 'exports', 'module'];
    }
    var evaluate = function() {
      var i, length, dependency,
          args = [],
          hasExports = false,
          exports, module, result;
      evaluate = function() {
        throw new Error("Circular dependency in module '" + module + " depends [" + dependencies.join(', ') + "]'.");
      };
      for (i = 0, length = dependencies.length; dependency = dependencies[i], i < length; i ++) {
        if (dependency === 'require') {
          args.push(require);
        } else if (dependency === 'exports') {
          exports = {};
          args.push(exports);
          hasExports = true;
        } else if (dependency === 'module') {
          module = {
            id: id,
            uri: '',
            exports: exports
          };
          args.push(module);
        } else {
          if ( ! (dependency in __evaluate)) {
            throw new Error("Broken dependency in module '" + module + "', dependency '" + dependency + "' was not satisfied.");
          }
          args.push(__evaluate[dependency]());
        }
      }
      if (typeof (factory) === 'function') {
        result = factory.apply(factory, args);
      } else {
        result = factory;
      }
      if (module && module.exports) {
        exports = module.exports;
      } else if ( ! hasExports) {
        exports = result;
      }
      evaluate = function() {
        return exports;
      };
      return evaluate();
    };
    if (id) {
      __evaluate[id] = function() {
        return evaluate.apply(evaluate, arguments);
      };
      return __evaluate[id];
    } else {
      return evaluate;
    }
  };
})();

/**
 * To allow a clear indicator that a global `define` function conforms to the AMD API,
 * set a property called 'amd' whose value is an object.
 *
 * @see https://github.com/amdjs/amdjs-api/wiki/AMD
 */
define.amd = {
  jQuery: true
};
