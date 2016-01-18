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
   * Current aggregation
   */
  currentAggregation: null,

  /**
   * Selected aggregations used to generate
   * the next query
   */
  selectedAggs: {},

  /**
   * Flag to check if its necessary to fetch
   * aggregations again
   */
  refreshAggregations: true,

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
    this.searchRules(query, params, this.get('selectedAggs'));

    // Set the default promises
    let defaultPromises = {
      search: this.get('yebo.products').search(query),
      taxonomies: this.yebo.store.findAll('taxonomy'),
      selectedAggs: this.get('selectedAggs')
    };

    // Check if its necessary to get the aggregations
    if( this.get('currentAggregation') === null || this.get('refreshAggregations') )
      defaultPromises.aggs = query.aggregations();
    else
      defaultPromises.aggs = this.get('currentAggregation');

    // Return a promise to the route
    return new Ember.RSVP.Promise((resolve, reject) => {
      // Execute the default model promises
      Ember.RSVP.hash(defaultPromises).then((result) => {
        // Set the current aggregation
        this.set('currentAggregation', result.aggs);

        // Define the route model
        let routeModel = this.searchModel(params);

        // Check if it is a promise
        if( routeModel.then === undefined )
          return resolve(merge(routeModel, result));

        // Resolve the promise with the result
        routeModel.then((res) => { resolve(merge(res, result)); });
      });
    });
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
   * @param {Object} aggs The selected aggregations
   * @return {void} This method does not return anything
   */
  searchRules(query, params, aggs) {
    // Generated rules
    let rules = [];

    // Set the price filter
    if( aggs.price !== undefined )
      rules.push(new YeboSDK.Products.Rules.price(aggs.price.split('-')));

    // Set filters
    if( aggs.filters !== undefined ) {
      // Each the filters
      for( let filter in aggs.filters ) {
        // Get the filter values
        let values = aggs.filters[filter];

        // Add the rule
        rules.push(new YeboSDK.Products.Rules.filter(filter, values));
      }
    }

    // As default set the relation
    // between the aggregations as `and`
    query.and(rules);
  },

  /**
   * This method enable the route to add info into the
   * model object that is returned
   * @param {Object} params Parameters that come from the route
   * @return {Object} This object will be merged into the default model
   *                  from the search. It can be a Promise that
   *                  returns an Object.
   */
  searchModel(params) {
    // As default return an empty object
    return {};
  }
});
