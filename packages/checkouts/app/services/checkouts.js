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
   * Ember simple auth session
   * @property session
  */
  session: Ember.inject.service('session'),

  // sessionAccount: Ember.inject.service('sessionAccount'),
  //

  /**
   * This flag enable the checkout button at the bottom of the page
   * @property canCheckout
   * @type Boolean
   */
  canCheckout: false,

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
   * Is the user using the bill address as ship address?
   * @property usingBillAddressAsShipAddress
   * @type Boolean
   */
  usingBillAddressAsShipAddress: true,

  /**
   * Order shipments packages
   * @property packages
   * @type Array
   */
  packages: [],

  /**
   * Order possible payments
   * @property payments
   * @type Array
   */
  payments: [],

  /**
   * Current payment method
   * @property currentPayment
   * @type Integer
   */
  currentPayment: 0,

  /**
   * Current payment options
   * @property currentPaymentOptions
   * @type Object
   */
  currentPaymentOptions: {},

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
   * Current Year
   * @property
   * @type Integer
   */
  currentYear: new Date().getFullYear(),

  /**
   * The method start the checkout process.
   * @todo If there is no address, bring the last for the user
   * @method
   * @public
   */
  initializeCheckout: function() {
    // Current Order
    let currentOrder = this.get('yebo').get('currentOrder');

    // Possible addresses
    let addresses = ['bill', 'ship'];

    // Each all the possible address
    for( let i in addresses ) {
      // Address
      let address = addresses[i],
          niceName = this._generateNiceName(address);

      // Check if the billAddress exists
      if( currentOrder.get(`${address}Address`).get('id') ) {
        // So... we dont need to create a new one
        this.set(`editing${niceName}Address`, false);

        // Define as the model
        this.set(`${address}Address`, currentOrder.get(`${address}Address`));

        // If the ship address exits set the flag to false
        if( address === 'ship' )
          this.set('usingBillAddressAsShipAddress', false);

        // So... We can calculate the shipments
        this.trigger('shipments');
      } else {
        // There is no address
        // Try to get a new one
        YeboSDK.Store.fetch(this._checkoutURL(`address/${address}`), {}, 'GET').then((res) => {
          // Check if the address exists
          if( res.address ) {
            // Yebo Store
            let store = this.get('yebo').get('store');

            // Push to the store
            store.pushPayload(res);

            // Set it to the checkout
            this.set(`${address}Address`, store.peekRecord('address', res.address.id));

            // So... We can calculate the shipments
            this.trigger('shipments');
          }
        });
      }
    }
  }.on('checkoutCalled'),

  /**
   * It will show the form from a specific address
   * @method
   * @public
   */
  startEditingAddress: function(name) {
    // Close all the address
    this.set('editingBillAddress', false);
    this.set('editingShipAddress', false);

    // Start Editing the address
    this.set(`editing${this._generateNiceName(name)}`, true);
  }.on('editAddress'),

  /**
   * This method calculate the order shipments.
   * @method
   * @public
   */
  calculateShipments: function() {
    // Yebo Ajax path
    let path = this._checkoutURL('shipments');

    // Request it
    YeboSDK.Store.fetch(path, {}, 'GET').then((res) => {
      // Isolate the shipments
      let shipments = res.shipments;

      // Current rates
      let currentRates = [];

      // Each it
      for( let i = 0; i < shipments.length; i++ ) {
        // Define the current shipment
        let shipment = shipments[i];

        // Set the current rate if it exists
        if( shipment.rates[0] ) {
          // Set the first rate
          shipment.currentRate = shipment.rates[0].id;

          // Set it also
          currentRates.push(shipment.rates[0].id);
        }
      }

      // Set it
      this.set('packages', shipments);

      // Each the currentRates and set it to the checkout
      for( let i = 0; i < currentRates.length; i++ )
        this.trigger('setShipment', currentRates[i]);
    }).catch((errors) => {
      // @todo Show this errors
      console.log(errors);
    });
  }.on('shipments', 'billAddress-saved', 'shipAddress-saved'),

  /**
   * This method set the shipment for an specific package
   * @method
   * @public
   */
  setShipment: function(rateId) {
    // The current packages
    let packages = this.get('packages');

    // Yebo Ajax path
    let path = this._checkoutURL('shipments/set');

    // Each it
    for( let i = 0; i < packages.length; i++ ) {
      // Current item
      let current = packages[i];

      // Each on the rates to find if the rate is in this package
      for( let iRate = 0; iRate < current.rates.length; iRate++ ) {
        // Current Rate
        let currentRate = current.rates[iRate];

        // Check if this is the right rate
        if( currentRate.id !== rateId )
          continue;

        // Ajax Options
        let options = {
          rate: currentRate.id,
          package: current.id
        };

        // Run the request
        YeboSDK.Store.fetch(path, options, 'POST').then((res) => {
          // Event!
          this.trigger('packageRateSetted');
        }).catch((errors) => {
          // @todo Show this errors
          console.log(errors);
        });
      }
    }
  }.on('setShipment'),

  /**
   * This method will bring the enabled payment method from the API.
   * @method
   * @public
   */
  generatePayments: function() {
    // ...
    console.log('Time to bring the payment methods!');

    // Yebo Ajax path
    let path = this._checkoutURL('payments');

    // Ajax Request
    YeboSDK.Store.fetch(path, {}, 'GET').then((res) => {
      console.log(res);
      // Set it...
      this.set('payments', res.payments);

      // Define a default payment method
      if( res.payments[0] )
        this.set('currentPayment', res.payments[0].id);

      // Trigger an event
      this.trigger('paymentsGot');
    }).catch((error) => {
      // @todo Show this error
      console.log(error);
    })
  }.on('payments', 'packageRateSetted'),

  /**
   * When the current payment changes this method will be called
   * @method
   * @public
   */
  paymentChange: function() {
    // Reset the currentPayment options
    this.set('currentPaymentOptions', {});

    // ...
    console.log('PAYMENT CHANGED!');
  }.observes('currentPayment'),

  /**
   * This event enable the Checkout button
   * @method
   * @private
   */
  enableCheckout: function() {
    console.log('You can finish your order now!!!');
    // Set it
    this.set('canCheckout', true);
  }.on('paymentsGot'),

  /**
   * This method save an address
   * @method
   * @public
   */
  saveAddress: function(name, address) {
    // Yebo Ajax path
    let path = this._checkoutURL(`address/update/${name.slice(0, 4)}`);

    // Current order number
    let currentOrder = this.get('yebo').get('currentOrder');

    // Check if this address exists
    if( !address.get('id') ) {
      // Set it in the currentOrder
      currentOrder.set(name, address);

      // Change it to create a new address
      path = this._checkoutURL(`address/create/${name.slice(0, 4)}`);
    }

    // Address serialized
    let serialized;

    // Address serialized
    if( address.content === undefined )
      serialized = address.serialize();
    else
      serialized = address.content.serialize();

    // Lets make it using the SDK
    YeboSDK.Store.fetch(path, serialized, 'POST').then((address) => {
      // Set the Address ID
      currentOrder.get(name).set('id', address.id);

      // The user is not editing anymore
      this.set(`editing${this._generateNiceName(name)}`, false);

      // Trigger some events here
      this.trigger(`${name}-saved`, address);
    }).catch((error) => {
      // @todo Show the error messages
      console.log(error);
    });
  }.on('saveAddress'),

  /**
   * This method will remove the ship address if its not required
   * @method
   * @private
   */
  removeShipAddress: function() {
    // Get the flag
    let flag = this.get('usingBillAddressAsShipAddress');

    // If its false do nothing
    if( flag === false )
      return;

    // Lets make it using the SDK
    YeboSDK.Store.fetch(this._checkoutURL('address/remove/ship'), {}, 'POST').then((res) => {
      // Create a new empty address
      let emptyAddress = this.get('yebo').get('store').createRecord('address');

      // Set it
      this.set('shipAddress', emptyAddress);
    });
  }.observes('usingBillAddressAsShipAddress'),

  /**
   * Final checkout execution
   * @method
   * @private
   */
  finishCheckout: function() {
    // Yebo Ajax path
    let path = this._checkoutURL('payments');

    // Ajax options
    let options = {
      method_id: this.get('currentPayment'),
      source: this.get('currentPaymentOptions')
    }

    // Lets make it using the SDK
    YeboSDK.Store.fetch(path, options, 'POST').then((res) => {
      // @todo Redirect to the order page
      console.log(res);
    }).catch((error) => {
      // @todo Show the error messages
      console.log(error);
    });
  }.on('checkout'),

  /**
   * This method capitalize the first letter of a string
   * @method
   * @private
   */
  _generateNiceName(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  },

  /**
   * This method generates a checkout url.
   *   /checkout/${orderNumber}/${action}?${userToken}
   *
   * @method
   * @private
   */
  _checkoutURL(action) {
    // Current order number
    let number = this.get('yebo').get('currentOrder').get('number');

    // The current user info that will be used on the path
    let userToken = this.get('session').get('session').get('authenticated').user.token;
    let currentUser = `?user_token=${userToken}`;

    // Yebo Ajax path
    return `checkout/${number}/${action}${currentUser}`;
  }
});
