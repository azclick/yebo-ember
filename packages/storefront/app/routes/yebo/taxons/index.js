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
  model: function(params) {
    return Ember.RSVP.hash({
      products: this.yebo.store.findAll('product', { taxon_id: params.taxon_id }),
      taxon: this.yebo.store.findAll('taxon').then(function(taxons) {
        return taxons.findBy('permalink', params.taxon_id)
      })
    })
  }
});
