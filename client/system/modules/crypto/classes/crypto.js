define('crypto',
/**
 * The Crypto module is a shim on top of Stanford Javascript Crypto Library.
 *
 * @exports crypto
 * @see http://crypto.stanford.edu/sjcl/
 */
function() {
  "use strict";
  return sjcl;
});
