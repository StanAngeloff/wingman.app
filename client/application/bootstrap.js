define(function(less, I18n, Route) {
  less.refreshStyles();
  I18n.language('en-GB');
  Route
    .match(false, 'Login#index')
    .start();
})();
