define('Security', function(Crypto, Config_Security) {
  return {
    hashPassword: function(password) {
      return Crypto.codec.hex.fromBits(Crypto.hash.sha256.hash([password, Config_Security.salt].join(':')));
    }
  }
});
