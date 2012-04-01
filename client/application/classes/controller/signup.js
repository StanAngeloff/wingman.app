define('controller/signup', ['underscore', 'controller', 'form', 'model/user', 'view/loading', 'view/signup/index'],
function(_, Controller, Form, ModelUser, ViewLoading, ViewSignupIndex) {
  function createForm() {
    return new Form('signup')
      .control('email', {
        type: 'email',
        size: 20,
        required: true,
        autofocus: true
      })
      .control('password', {
        type: 'password',
        size: 10,
        required: true,
        minlegth: 6
      })
      .control('password2', {
        type: 'password',
        size: 10,
        required: true,
        minlegth: 6
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
      model.save(form)
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
      new ViewSignupIndex().display(_.extend({
        form: form
      }, options));
    }
  });
});
