// Ember!
import Ember from 'ember';

// Merge method
const { merge } = Ember;

/**
 * Default route for product search,
 * its based on the YeboSDK Query system
 * @todo Define some outlets like 'aggs', 'pagination', 'sort',
 *       to share more components in the search pages
 */
export default Ember.Mixin.create({
  /**
   * Default params
   * @todo Enable the user to add new actions without overwriting this
   */
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

  /**
   * Default Sort
   */
  defaultSort: 'price-desc',

  /**
   * Products per page
   */
  perPage: 15,

  /**
   * Route Model
   */
  model: function(params) {
    // Create a new query
    let query = new YeboSDK.Products();

    // Define the number of results per page
    query.perPage(this.get('perPage'));

    // Set the search
    if( params.search !== undefined )
      query.search(params.search);

    // Define the sort param
    let sortParam;

    // Check if the sort param exists
    if( params.sort !== undefined )
      sortParam = params.sort;
    else
      sortParam = this.get('defaultSort');

    // Sort options
    let sortOptions = sortParam.split('-');

    // Set the page
    query.sortBy(sortOptions[0], sortOptions[1]);

    // Set the page
    query.page(params.page);

    // Define the search rules
    this.searchRules(query, params);

    let defaultModel = {
      search: this.get('yebo.products').search(query),
      sortParam: sortParam,
      taxonomies: this.yebo.store.findAll('taxonomy')
    };

    // Make the searches
    return Ember.RSVP.hash(merge(this.searchModel(params), defaultModel));
  },

  /**
   * Clear the query params when the user leaves the search page
   */
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

  /**
   * Route actions
   * @todo Enable the user to add new actions without overwriting this
   */
  actions: {
    changePage: function(pageNumber) {
      // Change the page number
      this.transitionTo({ queryParams: { page: pageNumber } })
    },
    changeSort: function(sort) {
      // Change the sort
      this.transitionTo({ queryParams: { sort: sort } })
    }
  },

  /**
   * Generate the search rules and put it into the
   * query that is going to be used
   * @todo Enable this method to be async
   * @param {YeboSDK.Products} query The query that is being formed,
   *                           so new rules will be added into this new query.
   * @param {Object} params Parameters that come from the route
   * @return {void} This method does not return anything
   */
  searchRules(query, params) {
    // Do nothing
  },

  /**
   * This method enable the route to add info into the
   * model object that is returned
   * @param {Object} params Parameters that come from the route
   * @return {Object} This object will be merged into the default model
   *                  from the search, and it will processed by the
   *                  Ember.RSVP.Hash method
   */
  searchModel(params) {
    // As default return an empty object
    return {};
  }
});
