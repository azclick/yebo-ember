import Ember from 'ember';
import layout from '../templates/components/yebo-details';
/**
  A mini "details" panel for the Yebo Checkout Route.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboDetails
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout
});
