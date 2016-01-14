import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  /**
   * Route model
   */
  model: function(params) {
    // Pass the param to the controller
    return params;
  },

  /**
   *
   */
  setupController: function(controller, model) {
    // Set the reset token
    controller.set('token', model.token);

    // Reset!
    controller.set('errors', undefined);
    controller.set('password', undefined);
    controller.set('passwordConfirmation', undefined);
  },

  /**
   * Route actions
   */
  actions: {
    // Submit the request reset password form
    submit: function() {
      // Current controller
      let controller = this.get('controller');

      // Get the passwords
      let password = controller.get('password'),
          passwordConfirmation = controller.get('passwordConfirmation');

      // Clean the errors
      controller.set('errors', { });

      // Request options
      let options = {
        password: password,
        password_confirmation: passwordConfirmation,
        token: controller.get('token')
      }

      // Call it
      YeboSDK.Store.fetch('users/reset/reset', options,  'POST').then(() => {
        // Set as OK!
        controller.set('passwordRested', true);
      }).catch((err) => {
        // Get the errors
        let errors = err.errors;

        // Check if the error is an string
        if( typeof errors === 'string' )
          controller.set('errors', err.errors);
        else
          controller.set('errors', err.errors.user.reset_password_token);
      });
    }
  }
});
