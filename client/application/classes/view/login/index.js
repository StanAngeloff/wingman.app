define('View/Login/Index', function(I18n, View_Default) {
  return View_Default.extend({
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
