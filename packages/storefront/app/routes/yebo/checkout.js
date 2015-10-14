import Ember from 'ember';
/**
  The checkout route.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g yebo-ember-storefront-routes
  ```

  This will install all of the Yebo Ember Storefront route files into your
  host application at `app/routes/yebo/*.js`, ready to be extended or
  overriden.

  @class Checkout
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend({
  redirect: function(model) {
    var currentOrder = this.yebo.get('currentOrder');

    if (currentOrder) {
      switch(currentOrder.get('state')) {
        case 'cart':
          this.transitionTo('yebo.cart');
          break;
        case 'complete':
          this.transitionTo('yebo.orders.show', currentOrder);
          break;
      }
    } else {
      this.transitionTo('yebo.products.index');
    }
  },

  actions: {
    transitionCheckoutState: function(state) {
      var _this = this;
      this.yebo.get('checkouts').transition(state).finally(function() {
        _this.redirect();
      });
    }
  }
});
