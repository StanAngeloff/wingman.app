define('Form/Control',
/**
 * @requires I18n
 * @requires module:Error~RuntimeError
 * @exports Form/Control
 */
function(I18n, RuntimeError) {
  /**
   * Create a new instance of a <code>Control</code>.
   *
   * @class A control is part of a <code>Form</code> and knows how to render itself in various formats.
   */
  function Control(name, attributes) {
    /** @private */
    this._attributes = _.extend({
      type: 'text'
    }, attributes, {
      name: name
    });
    return this;
  };

  /**
   * Get or set an attribute.
   *
   * @param {String} name The attribute name.
   * @param {Object} value When present, acts as a setter.
   * @return {Object}
   */
  Control.prototype.attribute = function(name, value) {
    if (typeof (value) !== 'undefined') {
      this._attributes[name] = value;
    }
    value = this._attributes[name];
    return (_.isFunction(value) ? value() : value);
  };

  /**
   * Get all control attributes.
   *
   * @return {Array}
   */
  Control.prototype.attributes = function() {
    var self = this, attributes = {};
    _.each(_.keys(this._attributes), function(key) {
      attributes[key] = self.attribute(key);
    });
    return attributes;
  };

  /**
   * Render the control in the given format.
   *
   * @param {String} format The format of the output (default is 'HTML').
   * @return {String}
   * @throws {module:Error~RuntimeError} If the format is not supported.
   */
  Control.prototype.toString = function(format) {
    format || (format = 'HTML');
    if (format === 'HTML') {
      return this.toHTMLString.apply(this, Array.prototype.slice.call(arguments).slice(1));
    }
    throw new RuntimeError(I18n.format("':method' does not support format ':format'.", {
      ':method': 'Control.toString',
      ':format': format
    }), 1330268351);
  };

  /**
   * Render the control as HTML string.
   *
   * @return {String}
   */
  Control.prototype.toHTMLString = function() {
    var tags = this._typeToHTMLTag(this._attributes.type),
        html = '<' + tags[0];
    _.each(this.attributes(), function(value, key) {
      html = html + ' ' + _.escape(key);
      if (value !== true) {
        html = html + '="' + _.escape(value) + '"';
      }
    });
    html = html + '>';
    return ('' + html);
  };

  /** @private */
  Control.prototype._typeToHTMLTag = function() {
    return ['input', false];
  };

  return Control;
});
