define('View/Login/Index', function(View_Default) {
  return View_Default.extend({
    _template: 'login/index',
    events: {
      'click #continue': 'sendLogin'
    },
    sendLogin: function(event) {
      event.preventDefault();
    }
  });
});
