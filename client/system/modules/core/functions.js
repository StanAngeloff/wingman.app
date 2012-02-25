/**
 * Define a module with optional dependencies.
 *
 * @function
 * @param {String} module Optional module ID. If this is omitted, no module is defined and instead <code>block</code> is called immediately.
 * @param {Array} dependencies Optional list of module IDs on which this module depends. If this is omitted, the arguments list of <code>block</code> will be used instead where all underscores will be converted to <code>'/'</code>.
 * @param {Function} block The module body. The function is called with arguments matching the given dependencies, if any.
 * @return {Function} The module body with dependencies injected.
 */
var define = (function() {
  var __modules = {};
  return function(module, dependencies, block) {
    if (_.isFunction(module)) {
      block = module;
      module = dependencies = null;
    } else if (typeof (block) === 'undefined') {
      block = dependencies;
      dependencies = null;
    }
    if (_.isArray(module)) {
      dependencies = module;
      module = null;
    }
    if (dependencies === null) {
      var signature = /^\s*function\s*\(([^)]+)\)/.exec(block.toString());
      if (signature) {
        dependencies = _.map(signature[1].split(','), function(value) {
          return value.replace(/^\s+|\s+$/g, '').replace(/_/g, '/');
        });
      } else {
        dependencies = [];
      }
    }
    var evaluate = function() {
      var args = [], exports;
      evaluate = function() {
        throw new Error("Circular dependency in module '" + module + " depends [" + dependencies.join(', ') + "]'.");
      };
      _.each(dependencies, function(dependency) {
        if ( ! (dependency in __modules)) {
          throw new Error("Broken dependency in module '" + module + "', dependency '" + dependency + "' was not satisfied.");
        }
        args.push(__modules[dependency]());
      });
      exports = block.apply(block, args);
      evaluate = function() {
        return exports;
      };
      return evaluate();
    };
    if (module === null) {
      return evaluate;
    } else {
      __modules[module] = function() {
        return evaluate.apply(evaluate, arguments);
      };
      return __modules[module];
    }
  };
})();
