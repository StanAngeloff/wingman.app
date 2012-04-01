define('view/loading', ['jquery', 'view', 'util'],
function($, View, Util) {
  var $loading;
  var klass = Util.singleton(View.extend({
    display: function() {
      var $element = this.target();
      this.destroy();
      $element.find('input, button').attr('disabled', true);
      $loading = $('<div>').attr({ id: 'loading' }).append($('<span>').addClass('indicator')).appendTo($element);
      if (document.activeElement) {
        try {
          document.activeElement.blur();
        } catch (e) {}
      }
      return this;
    },
    destroy: function() {
      $loading && $loading.remove();
      return this;
    }
  }));
  klass.begin = function() {
    this.instance().display();
  }
  klass.end = function() {
    this.instance().destroy();
  }
  return klass;
});
