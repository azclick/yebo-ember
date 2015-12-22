import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

/**
  The Orders Show Route.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g yebo-ember-storefront-routes
  ```

  This will install all of the Yebo Ember Storefront route files into your
  host application at `app/routes/yebo/*.js`, ready to be extended or
  overriden.

  @class OrdersShow
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function(params) {
    // Return a promise
    return new Ember.RSVP.Promise((resolve, reject) => {
      // Get the user
      this.get("sessionAccount.user").then((currentUser) => {
        // Get the user token
        let token = currentUser.get("token");

        // Yebo Store
        let store = this.get('yebo').store;

        // Get the order
        YeboSDK.Store.fetch(`orders/${params.id}`, { token: token, completed: true }, 'GET').then((res) => {
          // Push the records to the ember
          store.pushPayload(res);

          // Resolve passing the order
          resolve(store.peekRecord('order', res.order.number));
        }).catch((err) => {
          // Go back to home
          this.transitionTo('yebo.orders.index');
        });
      });
    });
  },
  afterModel: function(model) {
    if (this.yebo.get('currentOrder') === model) {
      this.yebo.clearCurrentOrder();
    }
  },
  redirect: function(model) {
    if (model.get('state') !== 'complete') {
      this.redirectTo('yebo.checkout');
    }
  }
});
