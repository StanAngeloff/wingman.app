define('View/Login/Index', function(I18n, View) {
  return View.extend({
    _template: 'login/index',
    events: {
      'click': 'click'
    },
    capitals: function(string) {
      return ('' + string).toUpperCase();
    },
    click: function() {
      alert(I18n.translate('You clicked me!'));
    }
  });
});
