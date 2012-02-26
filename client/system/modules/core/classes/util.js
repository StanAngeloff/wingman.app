/**
 * A collection of useful functions.
 *
 * @module Util
 */

define('Util', function() {
  return {
    /**
     * Convert special characters to HTML entities.
     *
     * @param {String} string The HTML-unsafe string.
     * @return {String}
     */
    escapeHTML: function(string) {
      return ('' + string)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;');
    }
  };
});
