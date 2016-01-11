import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(UnauthenticatedRouteMixin, {
  /**
   *
   */
  setupController: function(controller, model) {
    // Reset!
    controller.set('errors', undefined);
    controller.set('resetRequested', false);
    controller.set('identification', undefined);
  },

  /**
   * Route actions
   */
  actions: {
    // Submit the request reset password form
    submit: function() {
      // Current controller
      let controller = this.get('controller');

      // Get the user identification
      let email = controller.get('identification');

      // Clean the errors
      controller.set('errors', { });

      // Check if the email is empty
      if( email === undefined ) {
        // Set the errors
        controller.set('errors', [ { message: 'cannot be empty' } ]);

        // Return
        return;
      }

      // Request options
      // @todo Check if this way to get the store url will
      //       works in all the cases
      let options = {
        email: email,
        store_url: window.location.href
      }

      // Call it
      YeboSDK.Store.fetch('users/reset', options,  'POST').then(() => {
        // Set as OK!
        controller.set('resetRequested', true);
      }).catch((err) => {
        controller.set('errors', [ { message: 'is invalid' } ]);
      });
    }
  }
});
