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
  // Define the params
  queryParams: {
    search: {}
  },

  model: function(params) {
    console.log(params);

    // Make the searches
    return Ember.RSVP.hash({
      // products: this.yebo.store.findAll('product'),
      products: this.get('yebo.products').search(),
      taxonomies: this.yebo.store.findAll('taxonomy')
    });
  }
});
