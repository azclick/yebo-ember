import layout from '../templates/components/yebo-select';
import YeboInput from 'yebo-ember-storefront/components/yebo-input';
/**
  A select component with Label and outlet for validation errors.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboSelect
  @namespace Component
  @extends YeboInput
*/
export default YeboInput.extend({
  layout: layout,
  actions: {
    seleactAction: function(){
      return this.sendAction("select" + this.attributeName, this);
    }
  }
});
