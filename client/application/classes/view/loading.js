define('View/Loading', function(View) {
  var $loading;
  var klass = View.extend({
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
  });
  klass.instance = function() {
    return (this.__instance || (this.__instance = new this()));
  };
  klass.begin = function() {
    this.instance().display();
  }
  klass.end = function() {
    this.instance().destroy();
  }
  return klass;
});
