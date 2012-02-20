define('Controller/Login', function(Controller, I18n) {
  return Controller.extend({
    initialize: function() {
      console.log(I18n.format('DEBUG: Controller/Login initialized.'));
    },
    index: function() {
      console.log(I18n.format('XXX: Not implemented.'));
    }
  });
});
