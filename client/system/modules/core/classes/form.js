define('Form',
/**
 * @requires module:Form/Control~Control
 * @requires module:I18n
 * @requires module:Error~ArgumentError
 * @exports Form
 */
function(Form_Control, I18n, ArgumentError) {
  /**
   * Create a new instance of a <code>Form</code>.
   *
   * @class A form is a collection of <code>Control</code>s.
   */
  function Form(group) {
    /** @private */
    this._group = group;
    /** @private */
    this._controls = {};
    return this;
  };

  /**
   * Get or set the name of the form, a.k.a., the group name.
   *
   * @param {String} group When present, acts as a setter.
   * @return {String}
   */
  Form.prototype.group = function(group) {
    if (typeof (group) !== 'undefined') {
      this._group = group;
    }
    return this._group;
  };

  /**
   * Get or set (add) a control with the given name.
   *
   * @param {String} name The control name.
   * @param {Object|module:Form/Control~Control} attributes A list of <code>{ key: value }</code> pairs.
   * @return {Object} If a setter, a reference to self (useful for chaining methods).
   * @throws {module:Error~ArgumentError} If a control with the given name already exists.
   */
  Form.prototype.control = function(name, attributes) {
    if (typeof (attributes) !== 'undefined') {
      if (name in this._controls) {
        throw new ArgumentError(I18n.format("Form ':group' already has a control ':name'.", {
          ':group': this._group,
          ':name': name
        }), 1330267555);
      }
      var control;
      if (attributes instanceof Form_Control) {
        control = attributes;
      } else {
        var self = this;
        control = new Form_Control(function() {
          return (self._group + '[' + name + ']');
        }, _.extend({
          id: function() {
            return (self._group + '-' + name);
          }
        }, attributes));
      }
      this[name] = this._controls[name] = control;
      return this;
    }
    return this._controls[name];
  };

  /**
   * Retrieve or put values in the form controls.
   *
   * @param {Object} params When present, puts the list of <code>{ key: value }</code> pairs in the form where each <code>key</code> is the name of a control.
   * @param {Object} options Optional configuration. <code>{ exclude }</code> can be set to an <code>Array</code> to filter out certain control types, e.g., <code>password</code>.
   * @return {Form} When retrieving values, a <code>{ key: value }</code> list, otherwise a reference to self (useful for chaining methods).
   */
  Form.prototype.values = function(params, options) {
    if (typeof (params) === 'undefined') {
      params = {};
      _.each(this._controls, function(control, name) {
        params[name] = control.attribute('value');
      });
      return params;
    }
    options = _.extend({
      exclude: ['password']
    }, options);
    var values = (params && (this._group in params) ? params[this._group] : {});
    _.each(this._controls, function(control, name) {
      var value = values[name];
      if (~_.indexOf(options.exclude, control.attribute('type'))) {
        value = '';
      }
      control.attribute('value', value);
    });
    return this;
  };

  return Form;
});
