import Ember from 'ember';
import layout from '../templates/components/yebo-grid';
/**
  A Product Grid for the Products Index and Taxons Show routes.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboGrid
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,
  changeSort: 'changeSort',

  actions: {
    changePage: function(pageNumber) {
      // Send the action
      this.sendAction('action', pageNumber);
    },

    //
    changeOrderBy: function(order) {
      // Send the action
      this.sendAction('changeSort', order);
    }
  }
});
