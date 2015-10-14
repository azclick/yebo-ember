import Ember from 'ember';
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
export default Ember.Route.extend({
  model: function(params) {
    var _this = this;
    return this.yebo.store.find('order', params.id).catch(function() {
      _this.transitionTo('yebo.products.index');
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
