import Ember from 'ember';
import layout from '../templates/components/yebo-pdp';
/**
  The Yebo Product Display Page.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboPdp
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,
  variantSelection: null,
  quantity: 1,
  action: 'addToCart',

  //
  selectedVariant: Ember.computed('product.variants', 'variantSelection', function() {
    // Get the selection
    let selection = this.get('variantSelection');

    // If the select exists, return it
    if( selection )
      return selection;

    // Try to get the first variant
    let firstVariant = this.get('product.variants.firstObject');

    // Check if the firstVariant exists
    if( firstVariant )
      return firstVariant;
    else
      return this.get('product.master');
  }),

  //
  actions: {
    //
    addToCart: function() {
      this.sendAction('action', this.get('selectedVariant'), this.get('quantity'));
    },

    //
    selectVariant: function(variantId) {
      // Set as the selected variant
      // @todo Check if there is problem with this way
      this.set('variantSelection', this.yebo.store.peekRecord('variant', variantId));
    }
  }
});
