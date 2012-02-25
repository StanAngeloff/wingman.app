define('View/Default', function(View) {
  return View.extend({
    _partials: ['header', 'footer'],
    initialize: function() {
      var engine = this.engine().instance();
      _.each(this._partials, function(name) {
        engine.partial(name, new View('partials/' + name).templateContents());
      });
    }
  });
});
