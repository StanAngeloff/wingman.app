define('exceptions', ['underscore', 'exports'],
/**
 * A collection of custom exceptions.
 *
 * @requires module:underscore
 * @exports exceptions
 */
function(_, exports) {
/**
 * Create a new instance of a <code>RuntimeException</code>.
 *
 * @class A generic runtime error.
 * @param {Error|String} message The message to attach to the error or a reference to another error which is being wrapped.
 * @param {Number} code Optional, unique error code.
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
  return this;
};

RuntimeException.prototype = new Error;
RuntimeException.prototype.constructor = RuntimeException;

exports.RuntimeException = RuntimeException;

/**
 * Create a new instance of an <code>ArgumentException</code>.
 *
 * @class An error indicating function or method arguments were not accepted.
 */
function ArgumentException() {
  RuntimeException.apply(this, arguments);
  this.name = 'ArgumentException';
  return this;
};

ArgumentException.prototype = new RuntimeException();
ArgumentException.prototype.constructor = ArgumentException;

exports.ArgumentException = ArgumentException;

/**
 * Create a new instance of an <code>TypeException</code>.
 *
 * @class An error indicating a type requirement was not met.
 */
function TypeException() {
  RuntimeException.apply(this, arguments);
  this.name = 'TypeException';
  return this;
};

TypeException.prototype = new RuntimeException();
TypeException.prototype.constructor = TypeException;

exports.TypeException = TypeException;

/**
 * Create a new instance of a <code>ResourceException</code>.
 *
 * @class An error indicating a resource failed to load or experienced an issue while loading.
 */
function ResourceException() {
  RuntimeException.apply(this, arguments);
  this.name = 'ResourceException';
  return this;
};

ResourceException.prototype = new RuntimeException();
ResourceException.prototype.constructor = ResourceException;

exports.ResourceException = ResourceException;

/**
 * Create a new instance of a <code>NotImplementedException</code>.
 *
 * @class An error indicating a method that was called is abstract and no implementation is available.
 */
function NotImplementedException() {
  RuntimeException.apply(this, arguments);
  this.name = 'NotImplementedException';
  return this;
};

NotImplementedException.prototype = new RuntimeException();
NotImplementedException.prototype.constructor = NotImplementedException;

exports.NotImplementedException = NotImplementedException;

});
