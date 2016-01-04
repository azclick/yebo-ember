import Ember from 'ember';

/**
  The Taxons Index route.

  **To Override:** You'll need to run the routes generator:

  ```bash
  ember g yebo-ember-storefront-routes
  ```

  This will install all of the Yebo Ember Storefront route files into your
  host application at `app/routes/yebo/*.js`, ready to be extended or
  overriden.

  @class TaxonsIndex
  @namespace Route
  @extends Ember.Component
*/
export default Ember.Route.extend({
  //
  model: function() {
    return this.yebo.store.findAll('taxonomy');
  },

  //
  setupController: function(controller, model) {
    // Get the controller
    let appController = this.controllerFor('application');

    // Set some values to the controller
    appController.set('taxonomies', model);
    appController.set('currentTaxonomy', { });
  }
});
