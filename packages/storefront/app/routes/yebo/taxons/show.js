import Ember from 'ember';

/**
 * Taxons show page
 * This page shows products related to the current taxon
 */
export default Ember.Route.extend({
  // Define the query params
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  //
  model: function(params) {
    // Query and rule for this route
    let query, rule;

    // Check if the query exists
    if( !this.get('currentQuery') ) {
      // Define a query
      query = new YeboSDK.Products();

      // Define the rule
      rule = new YeboSDK.Products.Rules.taxonomy([]);

      // Add the rule to the query
      query.and(rule);

      // Define the number of results per page
      query.perPage(15);

      // Set query and rule to the route
      this.set('currentQuery', query);
      this.set('currentRule', rule);
    } else {
      // Get the current query and rule
      query = this.get('currentQuery');
      rule = this.get('currentRule');
    }

    // Set a new value to the rule
    rule.values = params.taxon.split('/');

    // Set the page
    query.page(params.page);

		// Todo: Reuse taxonomy find all
    return Ember.RSVP.hash({
      taxonomies: this.yebo.store.findAll('taxonomy'),
      taxon: this.yebo.store.find('taxon', params.taxon),
      search: this.yebo.products.search(query)
    });
  },

  // Change the current controller
  setupController: function(controller, model) {
    // This is indispensable, if out, the model won't be passed to the view
    controller.set('model', model);

    // the component that requires current taxon and taxonomies is in application
    let appController = this.controllerFor('application');

    // Define some values
    let taxon = model.taxon;
    let taxonomies = model.taxonomies;

    // Set the values to the application controller
    appController.set('currentTaxonomy', taxon.get('taxonomy'));
    appController.set('taxonomies', taxonomies);
  },

  // When reset the controller
  resetController(controller, isExiting, transition) {
    // Check if the user is leaving the page
    if (isExiting) {
      // Reset the page
      controller.set('page', 1);
    }
  },

  //
  actions: {
    changePage: function(pageNumber) {
      // Change the page number
      this.transitionTo({ queryParams: { page: pageNumber } })
    }
  }
});
