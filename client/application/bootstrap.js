define(['less', 'i18n', 'model', 'route'], function(Less, I18n, Model, Route) {
  Less.refreshStyles();
  I18n.language('en-GB');
  Model.root = '/backend';
  Route
    .match(false, 'login#index')
    .match('signup', 'signup#index')
    .start();
})();
