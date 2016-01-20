import Ember from 'ember';
import layout from '../templates/components/yebo-checkout';
/**
  A single page checkout that reactively responds to changes in the
  `yebo.checkouts` service.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboCheckout
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,
  action: 'transitionCheckoutState',

  /**
   *
   */
  didInsertElement() {
    // Call the super
    this._super();
    // Set initialize it
    // TODO: Move this to an initialzer
    this.get('yebo').on('orderLoaded', () => {
      this.get('yebo').get('checkouts').trigger('checkoutCalled');
    });

    if(this.get('yebo.currentOrder.number')) {
      this.get('yebo').get('checkouts').trigger('checkoutCalled');
    }
  },

  actions: {
    transitionCheckoutState: function(stateName) {
      this.sendAction('action', stateName);
    },
    setShipment: function(rateId) {
      // Trigger the event
      this.get('yebo').get('checkouts').trigger('setShipment', rateId);
    },
    checkout: function() {
      // Trigger the event
      this.get('yebo').get('checkouts').trigger('checkout');
    },
    editAddress: function(name) {
      // Trigger the event
      this.get('yebo').get('checkouts').trigger('editAddress', name);
    }
  }
});
