/**
 * Create a new instance of a <code>RuntimeException</code>.
 *
 * @class A generic runtime exception.
 * @augments Error
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

/**
 * Create a new instance of an <code>ArgumentException</code>.
 *
 * @class An exception indicating function or method arguments were not accepted.
 * @augments RuntimeException
 */
function ArgumentException() {
  RuntimeException.apply(this, arguments);
  this.name = 'ArgumentException';
};

ArgumentException.prototype = new RuntimeException();
ArgumentException.prototype.constructor = ArgumentException;

/**
 * Create a new instance of an <code>ClassDoesNotExistException</code>.
 *
 * @class An exception indicating a class did not exist in scope.
 * @augments RuntimeException
 */
function ClassDoesNotExistException() {
  RuntimeException.apply(this, arguments);
  this.name = 'ClassDoesNotExistException';
};

ClassDoesNotExistException.prototype = new RuntimeException();
ClassDoesNotExistException.prototype.constructor = ClassDoesNotExistException;
