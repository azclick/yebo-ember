import Ember from 'ember';

/**
 *
 */
export default Ember.Service.extend(Ember.Evented, {
  /**
    A reference to the Yebo Service.

    @property yebo
    @type Ember.Service
  */
  yebo: Ember.inject.service('yebo'),

  /**
    A reference to the Yebo Object's `currentOrder`.
    @property currentOrder
    @type DS.Model
  */
  currentOrder: Ember.computed.alias('yebo.currentOrder')
});
