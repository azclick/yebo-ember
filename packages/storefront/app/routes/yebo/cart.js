import Ember from 'ember';
/**
  The cart route.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g yebo-ember-storefront-routes
  ```

  This will install all of the Yebo Ember Storefront route files into your
  host application at `app/routes/yebo/*.js`, ready to be extended or
  overriden.

  @class Cart 
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend({
  actions: {
    deleteLineItem: function(lineItem) {
      var currentOrder = this.yebo.get('currentOrder');
      lineItem.destroyRecord().finally(function() {
          currentOrder.reload();
      });
    },

    transitionToCheckout: function() {
      if (this.yebo.get('currentOrder.state') !== 'cart') {
        this.transitionTo('yebo.checkout');
      } else {
        var _this = this;
        this.yebo.get('checkouts').transition().finally(function() {
          _this.transitionTo('yebo.checkout');
        });
      }
    }
  }
});
