import Ember from 'ember';
import layout from '../templates/components/yebo-order';
/**
  An order detail page.  Used on the confirmation checkout step, and the Orders
  show page.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboOrder
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,
  action: 'transitionCheckoutState',

  actions: {
    transitionCheckoutState: function(stateName) {
      this.sendAction('action', stateName);                          
    }
  }
});
