define('view/default', ['i18n', 'view'],
function(I18n, View) {
  return View.extend({
    translate: function() {
      return I18n.translate.apply(I18n, arguments);
    },
    control: function(control) {
      return new View('partials/control').toString({
        id: control.attribute('id'),
        title: I18n.translate('form.' + control.attribute('name')),
        control: control.toString()
      });
    }
  });
});
