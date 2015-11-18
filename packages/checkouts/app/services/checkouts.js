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
   * When background action is running this flag is setted to `true`.
   * @preperty loading
   * @type Boolean
   */
  loading: true,

  /**
   * Editing billAddress
   * @property editingbillAddress
   * @type Boolean
   */
  editingBillAddress: true,

  /**
   * Editing shipAddress
   * @property editingShipAddress
   * @type Boolean
   */
  editingShipAddress: false,

  /**
   * BillAddress
   * @property
   * @type Object/DS.Model
   */
  billAddress: Ember.computed('yebo', function() {
    // Create an empty address
    return this.get('yebo').get('store').createRecord('address');
  }),

  /**
   * ShipAddress
   * @property
   * @type Object/DS.Model
   */
  shipAddress: Ember.computed('yebo', function() {
    // Create an empty address
    return this.get('yebo').get('store').createRecord('address');
  }),

  /**
   * The method start the checkout process.
   * @method
   * @public
   */
  initializeCheckout: function() {
    // Current Order
    let currentOrder = this.get('yebo').get('currentOrder');

    // Check if the billAddress exists
    // @todo Check if the flag `isFulfilled` will work in this case
    if( currentOrder.get('billAddress').isFulfilled ) {
      // So... we dont need to create a new one
      this.set('editingBillAddress', false);

      // Define as the model
      this.set('billAddress', currentOrder.get('billAddress'));
    }

    // Nice message
    console.log('HERE IN THE SERVICE WAITING TO INITIALIZE IT!');
  }.on('checkoutCalled'),

  /**
   * This method calculate the order shipments.
   * @method
   * @public
   */
  calculateShipments: function() {
    // ...
  }.on('shipments', 'billAddress-saved', 'shipAddress-saved'),

  /**
   * This method will bring the enabled payment method from the API.
   * @method
   * @public
   */
  generatePayments: function() {
    // ...
  }.on('payments', 'shipmentsCalculated', 'shipmentsChanged'),

  /**
   * This method save an address
   * @method
   * @public
   */
  saveAddress: function(name, address) {
    // Current order
    let currentOrder = this.get('yebo').get('currentOrder');

    // Current order number
    let number = currentOrder.get('number');

    // Yebo Ajax path
    let path = `checkout/${number}/address/update/${name.slice(0, 4)}`

    // Check if this address exists
    if( !address.get('id') ) {
      // Set it in the currentOrder
      currentOrder.set(name, address);

      // Change it to create a new address
      path = `checkout/${number}/address/create/${name.slice(0, 4)}`
    }

    // Lets make it using the SDK
    // @todo Make it work by passing the User Token to the action
    YeboSDK.Store.fetch(path, address.toJSON(), 'POST').then((address) => {
      // Set the Address ID
      currentOrder.get(name).set('id', address.id);

      // The user is not editing anymore
      this.set(`editing${_generateNiceName(name)}`, false);

      // Trigger some events here
      this.trigger(`${name}-saved`, address);
    }).catch((error) => {
      console.log(error);
    });
  }.on('saveAddress'),

  /**
   * This method capitalize the first letter of a string
   * @method
   * @private
   */
  _generateNiceName(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
