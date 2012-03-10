define(function(less, I18n, Model, Route) {
  less.refreshStyles();
  I18n.language('en-GB');
  Model.root = '/backend';
  Route
    .match(false, 'Login#index')
    .match('signup', 'SignUp#index')
    .start();
})();
