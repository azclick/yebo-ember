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

  /**
   * The query will be stored here
   */
  currentQuery: null,

  model: function(params) {
    // Start a new Query if its necessary
    if( this.get('currentQuery') === null )
      this.set('currentQuery', new YeboSDK.Products());

    // Query
    let query = this.get('currentQuery');

    // Set the search
    // @todo Do not send seach param if its not necessary
    if( params.search === 'null' )
      query.search(null);
    else
      query.search(params.search);

    // Make the searches
    return Ember.RSVP.hash({
      // products: this.yebo.store.findAll('product'),
      products: this.get('yebo.products').search(query),
      taxonomies: this.yebo.store.findAll('taxonomy')
    });
  }
});
