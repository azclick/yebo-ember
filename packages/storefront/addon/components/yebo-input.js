import Ember from 'ember';
import layout from '../templates/components/yebo-input';
/**
  An input with Label, Placeholder and outlet for Validation Errors.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboInput
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,

  displayErrors: Ember.computed('errors.[]', 'attributeName',  function() {
    var errors = this.get('errors') || [];
    var attributeName = this.get('attributeName');

    var namedErrors = errors.map(function(error) {
      return attributeName ? attributeName  + " " + error.message : error.attribute + " " + error.message ;
    });

    return namedErrors.join(', ') + ".";
  })
});
