define('view/signup/index', ['jquery', 'underscore', 'i18n', 'route', 'view/default'], function($, _, I18n, Route, ViewDefault) {
  return ViewDefault.extend({
    template: 'signup/index',
    events: {
      'click .cancel': 'goToPrevious',
      'submit form': 'processSignUp',
      'input [type="password"]': 'validatePasswords'
    },
    goToPrevious: function() {
      Route.previous();
    },
    processSignUp: function(event) {
      event.preventDefault();
      this.validatePasswords();
      var $form = this.$('form');
      if ( ! $form.get(0).checkValidity()) {
        return false;
      }
      Route.post('signup#index', $form.serialize());
    },
    validatePasswords: function() {
      var $passwords = this.$('[type="password"]'),
          allValid, allMatch;
      _.each($passwords, function(element) {
        var $element = $(element),
            minLength = parseInt($element.attr('minlegth'), 10);
        element.setCustomValidity('');
        if ( ! isNaN(minLength) && $element.val().length < minLength) {
          element.setCustomValidity(I18n.format('validity.minlength', {
            ':length': minLength
          }));
        }
      });
      allValid = _.reduce($passwords, function(memo, element) {
        return (memo && element.validity.valid);
      }, true);
      if ( ! allValid) {
        return false;
      }
      allMatch = _.reduce($passwords, function(memo, element) {
        return ($(element).val() === memo ? memo : false);
      }, $passwords.first().val());
      if (allMatch) {
        return true;
      }
      $passwords.get($passwords.length - 1).setCustomValidity(I18n.translate('validity.password.match'));
    }
  });
});
