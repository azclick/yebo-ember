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
  currentOrder: Ember.computed.alias('yebo.currentOrder'),

  /**
   * Editing shipAddress
   * @property editingShipAddress
   * @type Boolean
   */
  editingShipAddress: false,

  /**
   * Editing billAddress
   * @property editingbillAddress
   * @type Boolean
   */
  editingBillAddress: true,

  /**
   * The method start the checkout process
   * @method
   * @public
   */
  initializeCheckout: function() {
    console.log('HERE IN THE SERVICE WAITING TO INITIALIZE IT!');
  }.on('checkoutCalled')
});
