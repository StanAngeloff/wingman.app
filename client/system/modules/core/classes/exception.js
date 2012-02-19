define('RuntimeException',
/**
 * @exports Exception
 */
function() {
  /**
   * Create a new instance of a <code>RuntimeException</code>.
   *
   * @class A generic runtime exception.
   * @param {Error|String} message The message to attach to the exception or a reference to another exception which is being wrapped.
   * @param {Number} code Optional, unique exception code.
   */
  function RuntimeException(message, code) {
    this.name = 'RuntimeException';
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

  RuntimeException.prototype = new Error;
  RuntimeException.prototype.constructor = RuntimeException;

  return RuntimeException;
});

define('ArgumentException', ['RuntimeException'],
/**
 * @exports Exception
 * @requires module:Exception~RuntimeException
 */
function(RuntimeException) {
  /**
   * Create a new instance of an <code>ArgumentException</code>.
   *
   * @class An exception indicating function or method arguments were not accepted.
   * @extends module:Exception~RuntimeException
   */
  function ArgumentException() {
    RuntimeException.apply(this, arguments);
    this.name = 'ArgumentException';
  };

  ArgumentException.prototype = new RuntimeException();
  ArgumentException.prototype.constructor = ArgumentException;

  return ArgumentException;
});

define('TypeException', ['RuntimeException'],
/**
 * @exports Exception
 * @requires module:Exception~RuntimeException
 */
function(RuntimeException) {
  /**
   * Create a new instance of an <code>TypeException</code>.
   *
   * @class An exception indicating a type requirement was not met.
   * @extends module:Exception~RuntimeException
   */
  function TypeException() {
    RuntimeException.apply(this, arguments);
    this.name = 'TypeException';
  };

  TypeException.prototype = new RuntimeException();
  TypeException.prototype.constructor = TypeException;

  return TypeException;
});
