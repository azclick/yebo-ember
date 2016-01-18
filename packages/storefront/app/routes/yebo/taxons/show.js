// Ember!
import Ember from 'ember';
import SearchRoute from 'yebo-ember-storefront/mixins/search-route';

/**
 * Taxons show page
 * This page shows products related to the current taxon
 */
export default Ember.Route.extend(SearchRoute, {
  /**
   * Define the search rules
   */
  searchRules(query, params) {
    // Create a new taxonomy rule
    let rule = new YeboSDK.Products.Rules.taxonomy([]);

    // Set its values
    rule.values = [params.taxon];

    // Set it into the query
    query.and(rule);
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

  /**
   * This values will be returned into the route (with the route model)
   */
  searchModel(params) {
    // Search all the taxonomies and the current taxon
    return {
      taxonomies: this.yebo.store.findAll('taxonomy'),
      taxon: this.yebo.store.find('taxon', params.taxon),
    };
  }
});
