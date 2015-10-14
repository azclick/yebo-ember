import Ember from 'ember';
/**
  The Products Index Page.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g yebo-ember-storefront-routes
  ```

  This will install all of the Yebo Ember Storefront route files into your
  host application at `app/routes/yebo/*.js`, ready to be extended or
  overriden.

  @class ProductsIndex
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend({
  model: function() {
    return Ember.RSVP.hash({
      products: this.yebo.store.find('product'),
      taxonomies: this.yebo.store.find('taxonomy')
    });
  }
});
