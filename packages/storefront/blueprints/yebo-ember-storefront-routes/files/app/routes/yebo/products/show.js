import Ember from 'ember';
/**
  The Product PDP (show) route.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g yebo-ember-storefront-routes
  ```

  This will install all of the Yebo Ember Storefront route files into your
  host application at `app/routes/yebo/*.js`, ready to be extended or
  overriden.

  @class ProductsShow
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend({
  model: function(params) {
    return this.yebo.store.findBySlug('product', params.slug);
  },

  actions: {
    addToCart: function(variant, quantity) {
      var _this = this;
      this.yebo.addToCart(variant, quantity).then(
        function() {
          _this.transitionTo('yebo.cart');
        }
      );
    }
  }
});
