import Ember from 'ember';
import layout from '../templates/components/yebo-images';
/**
  A variant aware image browser for the Yebo PDP.

  **To Override:** You'll need to run the components generator:

  ```bash
  ember g yebo-ember-storefront-components
  ```

  This will install all of the Yebo Ember Storefront component files into your
  host application at `app/components/yebo-*.js`, ready to be extended or
  overriden.

  @class YeboImages
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,
  activeImage: null,

  selectedImage: Ember.computed('activeImage', 'images.[]', function() {
    var activeImage = this.get('activeImage');
    if (activeImage) {
      return activeImage;
    } else {
      return this.get('images.firstObject');
    }
  }),

  actions: {
    selectImage: function(image) {
      this.set('activeImage', image);
      return false;
    }
  }
});
