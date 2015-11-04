import Ember from 'ember';
import layout from '../templates/components/yebo-taxonomies';
/**
  A sidebar style panel for Yebo's top-level taxonomy tree.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboTaxonomies
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout
});
