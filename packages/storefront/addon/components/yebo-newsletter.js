// Dependencies
import Ember from 'ember';
import layout from '../templates/components/yebo-newsletter';

/**
  The search form

  @class YeboDetails
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,

  // User information
  email: '',
  fullName: '',
  gender: 1,

  // Flags with what happend
  failure: false,
  success: false,

  actions: {
    /**
     * Subscribe the user to the newsletter
     */
    subscribe: function() {
      // Get the user info
      let userInfo = {
        full_name: this.get('fullName'),
        gender: this.get('gender')
      }

      // Make the subscription
      this.get('yebo.newsletters').subscribe(this.get('email'), userInfo).then((subscription) => {
        // Success!
        this.set('failure', false);
        this.set('success', true);
      }).catch((err) => {
        // Error!
        this.set('failure', true);
        this.set('success', false);
      });
    }
  }
});
