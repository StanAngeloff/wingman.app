define('controller/login', ['underscore', 'controller', 'form', 'model', 'route', 'model/user', 'view/loading', 'view/login/index'],
function(_, Controller, Form, Model, Route, ModelUser, ViewLoading, ViewLoginIndex) {
  function createForm() {
    return new Form('login')
      .control('email', {
        type: 'email',
        size: 20,
        required: true,
        autofocus: true
      })
      .control('password', {
        type: 'password',
        size: 10,
        required: true
      });
  };
  return Controller.extend({
    index: function() {
      var form = createForm();
      if (this.request().method === 'POST') {
        return this._process(this.request().params, form);
      }
      this._displayForm(form);
    },
    _process: function(params, form) {
      var self = this,
          options;
      form.values(params, { exclude: false });
      ViewLoading.begin();
      var model = new ModelUser();
      model.set(form).fetch({ data: model.toJSON() })
        .always(function() {
          ViewLoading.end();
        }).then(function() {
          console.error("XXX: 'success' not implemented.");
        }, function(model, request) {
          options = { failure: request.responseText };
        }).always(function() {
          self._displayForm(form, options);
        });
    },
    _displayForm: function(form, options) {
      new ViewLoginIndex().display(_.extend({
        form: form
      }, options));
    }
  });
});
