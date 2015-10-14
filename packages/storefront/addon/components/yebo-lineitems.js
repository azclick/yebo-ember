import Ember from 'ember';
import layout from '../templates/components/yebo-lineitems';
/**
  A table for listing the Line Items in an order.  Used on the Cart, Checkouts
  confirmation, and Orders show routes.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboLineitems
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,
  action: 'deleteLineItem',

  actions: {
    deleteLineItem: function(lineItem) {
      this.sendAction('action', lineItem);
      return false;
    }
  }
});
