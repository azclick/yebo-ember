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
    search: {
      refreshModel: true
    },
    page: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    }
  },

  // Current ordenation
  currentSortParam: 'price-desc',

  /**
   * The query will be stored here
   */
  currentQuery: null,

  model: function(params) {
    // Query
    let query;

    // Start a new Query if its necessary
    if( this.get('currentQuery') === null ) {
      // Create a new query
      query = new YeboSDK.Products();

      // Define the number of results per page
      query.perPage(15);

      // Set it to the route
      this.set('currentQuery', query);
    } else
      query = this.get('currentQuery');

    // Set the search
    // @todo Do not send seach param if its not necessary
    if( params.search !== undefined )
      query.search(params.search);

    // Check if the sort param exists
    if( params.sort !== undefined )
      this.set('currentSortParam', params.sort);

    // Sort options
    let sortOptions = this.get('currentSortParam').split('-');

    // Set the page
    query.sortBy(sortOptions[0], sortOptions[1]);

    // Set the page
    query.page(params.page);

    // Make the searches
    return Ember.RSVP.hash({
      // products: this.yebo.store.findAll('product'),
      search: this.get('yebo.products').search(query),
      sortParam: this.get('currentSortParam'),
      taxonomies: this.yebo.store.findAll('taxonomy')
    });
  },

  // When reset the controller
  resetController(controller, isExiting, transition) {
    // Check if the user is leaving the page
    if (isExiting) {
      // Reset the page
      controller.set('page', 1);

      // Reset the search
      controller.set('search', undefined);

      // Reset the sort
      controller.set('sort', undefined);
    }
  },

  //
  actions: {
    changePage: function(pageNumber) {
      // Change the page number
      this.transitionTo({ queryParams: { page: pageNumber } })
    },
    changeSort: function(sort) {
      // Change the sort
      this.transitionTo({ queryParams: { sort: sort } })
    }
  }
});
