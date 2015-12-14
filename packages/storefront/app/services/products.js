import Ember from 'ember';

/**
 * Service used to list the products from the store.
 */
export default Ember.Service.extend(Ember.Evented, {
  /**
   * Yebo main service reference
   */
  yebo: Ember.inject.service('yebo'),
});
