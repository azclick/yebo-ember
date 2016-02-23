import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import UserRouteActions from 'yebo-ember-auth/mixins/user-route-actions';

// export default Ember.Route.extend(AuthenticatedRouteMixin, UserRouteActions);
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  /**
   * Current user
   */
  currentUser: Ember.computed.alias('session.authenticated.user'),

  /**
   * Route model
   */
  model: function() {
    // Current user token
    let token = this.get('currentUser').token;

    // Addess promise
    let address = new Ember.RSVP.Promise((resolve, reject) => {
      // Get the address
      YeboSDK.Store.fetch(`users/address/${token}/bill`).then((res) => {
        // Check if the response is empty
        if( Ember.isArray(res.address) )
          resolve();

        // Yebo Store
        let store = this.get('yebo.store');

        // Add to the store
        store.pushPayload(res);

        // Return the object
        resolve(store.peekRecord('address', res.address.id));
      });
    });

    // Model with Promises
    return Ember.RSVP.hash({
      currentAddress: address,
      currentUser: this.get('currentUser')
    });
  },

  /**
   * Route actions
   */
  actions: {
    /**
     * Update the current user attributes
     */
    updateCurrentUser: function() {
      // Yebo Instance
      let yebo = this.get('yebo');

      // Current user
      let currentUser = this.get('currentUser'),
          token = currentUser.token;

      // Request options
      let options = { email: currentUser.email };

      // Return a promise
      return YeboSDK.Store.fetch(`users/update/${token}`, options, 'POST').then((res) => {
        // Trigger success
        yebo.trigger('didUpdateCurrentUser', currentUser);
      }).catch((err) => {
        // Trigger the errors
        yebo.trigger('currentUserUpdateFailed', error);
        yebo.trigger('serverError', error);
      });
    }
  }
});
