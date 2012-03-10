define('Model/User', function(Model) {
  return Model.extend({
    name: 'user',
    defaults: {
      email: null,
      password: null
    }
  });
});
