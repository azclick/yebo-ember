import Ember from 'ember';
import layout from '../templates/components/yebo-address';
/**
  Controls data entry for an order's Ship or Bill Address.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboAddress
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout
});
