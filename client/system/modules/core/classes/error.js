define('RuntimeError',
/**
 * @exports Error
 */
function() {
  /**
   * Create a new instance of a <code>RuntimeError</code>.
   *
   * @class A generic runtime error.
   * @param {Error|String} message The message to attach to the error or a reference to another error which is being wrapped.
   * @param {Number} code Optional, unique error code.
   */
  function RuntimeError(message, code) {
    this.name = 'RuntimeError';
    Error.call(this);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, arguments.callee);
    }
    _.extend(this, {
      message: message,
      code: code
    });
    if (message instanceof Error) {
      _.extend(this, {
        message: message.message,
        stack: message.stack
      });
    }
  };

  RuntimeError.prototype = new Error;
  RuntimeError.prototype.constructor = RuntimeError;

  return RuntimeError;
});

define('ArgumentError', ['RuntimeError'],
/**
 * @exports Error
 * @requires module:Error~RuntimeError
 */
function(RuntimeError) {
  /**
   * Create a new instance of an <code>ArgumentError</code>.
   *
   * @class An error indicating function or method arguments were not accepted.
   * @extends module:Error~RuntimeError
   */
  function ArgumentError() {
    RuntimeError.apply(this, arguments);
    this.name = 'ArgumentError';
  };

  ArgumentError.prototype = new RuntimeError();
  ArgumentError.prototype.constructor = ArgumentError;

  return ArgumentError;
});

define('TypeError', ['RuntimeError'],
/**
 * @exports Error
 * @requires module:Error~RuntimeError
 */
function(RuntimeError) {
  /**
   * Create a new instance of an <code>TypeError</code>.
   *
   * @class An error indicating a type requirement was not met.
   * @extends module:Error~RuntimeError
   */
  function TypeError() {
    RuntimeError.apply(this, arguments);
    this.name = 'TypeError';
  };

  TypeError.prototype = new RuntimeError();
  TypeError.prototype.constructor = TypeError;

  return TypeError;
});

define('ResourceError', ['RuntimeError'],
/**
 * @exports Error
 * @requires module:Error~RuntimeError
 */
function(RuntimeError) {
  /**
   * Create a new instance of an <code>ResourceError</code>.
   *
   * @class An error indicating a resource failed to load or experienced an issue while loading.
   * @extends module:Error~RuntimeError
   */
  function ResourceError() {
    RuntimeError.apply(this, arguments);
    this.name = 'ResourceError';
  };

  ResourceError.prototype = new RuntimeError();
  ResourceError.prototype.constructor = ResourceError;

  return ResourceError;
});
