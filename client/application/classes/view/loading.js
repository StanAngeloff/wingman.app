define('View/Loading', function(View) {
  var $loading;
  return View.extend({
    display: function() {
      var $element = this.target();
      $loading && $loading.remove();
      $element.find('input, button').attr('disabled', true);
      $loading = $('<div>').attr({ id: 'loading' }).append($('<span>').addClass('indicator')).appendTo($element);
      if (document.activeElement) {
        try {
          document.activeElement.blur();
        } catch (e) {}
      }
      return this;
    }
  });
});
