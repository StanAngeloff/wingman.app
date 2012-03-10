define('Model/User', function(Crypto, Config_Security, Model) {
  return Model.extend({
    name: 'user',
    defaults: {
      email: null,
      password: null
    },
    toJSON: function() {
      return _.extend(Model.prototype.toJSON.apply(this, arguments), {
        password: Crypto.codec.hex.fromBits(Crypto.hash.sha256.hash([this.get('password'), Config_Security.salt].join(':')))
      });
    }
  });
});
