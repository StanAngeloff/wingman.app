/**
 * A module to deal with internationalization and localization.
 *
 * @module I18n
 */

define('I18n', function() {
  var __cache = {};
  return {
    /** @private */
    _language: 'en-US',
    /** @private */
    _cached: false,
    /**
     * Get or set the language to translate all messages to.
     *
     * <p>When a new language code is set, a module at <code>I18n/{code}</code>
     * is expected to be already defined. This modules must return a hash of
     * <code>{ key: value }</code> pairs where each <code>key</code> would correspond to
     * a message used in the application.</p>
     *
     * @param {String} code When present, acts as a setter.
     * @return {String}
     */
    language: function(code) {
      if (typeof (code) !== 'undefined') {
        this._language = code;
        this._cached = false;
      }
      return this._language;
    },
    /**
     * Translate a message from English to another language.
     *
     * <p><strong>Not implemented.</strong></p>
     *
     * @param {String} message The message in English.
     * @return {String} The message translated in the configured language.
     */
    translate: function(message) {
      if ( ! this._cached) {
        try {
          __cache[this._language] = require('I18n/' + this._language);
        } catch (e) {
          __cache[this._language] = {};
        }
        this._cached = true;
      }
      return ((message in __cache[this._language]) ? __cache[this._language][message] : message);
    },
    /**
     * Translate and format a message from English to another language.
     *
     * @param {String} message The message in English.
     * @param {Object} options A hash of <code>{ key: value }</code> pairs where each <code>key</code> is substituted in <code>message</code> with <code>value</code>.
     * @return {String} The message translated and formatted using <code>options</code>.
     * @see I18n.translate
     */
    format: function(message, options) {
      message = this.translate(message);
      if ( ! options) {
        return message;
      }
      _.each(options, function(replacement, original) {
        message = message.replace(original, replacement);
      });
      return message;
    }
  };
});
