define('View/Default', function(I18n, View) {
  return View.extend({
    translate: function() {
      return I18n.translate.apply(I18n, arguments);
    }
  });
});
