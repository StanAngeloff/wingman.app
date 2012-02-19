/**
 * A module to deal with internationalization and localization.
 *
 * @module I18n
 */

define('I18n', function() {
  return {
    /**
     * Translate a message from English to another language.
     *
     * <p><strong>Not implemented.</strong></p>
     *
     * @param {String} message The message in English.
     * @return {String} The message translated in the configured language.
     */
    translate: function(message) {
      return message;
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
