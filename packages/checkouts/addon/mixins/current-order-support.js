import Ember from 'ember';

/**
  Provides Current Order and Checkout Functionality to the Yebo service.  This
  mixin is applied to the Yebo service when yebo-ember-checkouts initializes,
  therefore all functionality described here is available like so:

  ```javascript
  this.yebo.addToCart(variantModel, 5);
  ```

  @class CurrentOrderSupport
  @namespace Mixin
  @extends Ember.Mixin
*/
export default Ember.Mixin.create({
  /**
    A generic event triggered whenever a Yebo Server request fails.

    @event serverError
    @param {Object} error The error object returned from the Yebo Server.
  */

  /**
    Triggered whenever a Line Item is created or updated.

    @event didAddToCart
    @param {DS.Model} lineItem The newly updated lineItem object
  */

  /**
    Triggered whenever a Line Item is created or updated.

    @event addToCartFailed
    @param {Error} error The returned Server Error.
  */

  /**
    Triggered whenever a new Order is created for the checkout user.

    @event didCreateNewOrder
    @param {DS.Model} order The newly created order object
  */

  /**
    Triggered whenever a new Order is created for the checkout user.

    @event newOrderCreateFailed
    @param {Object} error The returned Server Error.
  */

  /**
    Triggered whenever a new Order is created for the checkout user.

    @event didClearCurrentOrder
  */

  /**
    Triggered whenever the Current Order changes State.

    @event checkoutStateDidChange
    @param {DS.Model} order The Current Order.
  */

  /**
    Triggered when the `_saveCurrentOrder` call succeeds.

    @event didSaveCurrentOrder
    @param {Ember.RSVP.Promise} currentOrderPromise A promise that resolves to
    the Current Order
  */

  /**
    Triggered when the `_saveCurrentOrder` call fails.

    @event saveCurrentOrderFailed
    @param {Error} error The returned Server Error.
  */

  /**
    Triggered when the `advanceCurrentOrder` call succeeds.

    @event didAdvanceCurrentOrder
    @param {Ember.RSVP.Promise} currentOrderPromise A promise that resolves to
    the Current Order
  */

  /**
    Triggered when the `advanceCurrentOrder` call fails.

    @event advanceCurrentOrderFailed
    @param {Error} error The returned Server Error.
  */

  /**
    Triggered whenever the Current Order reached it's "Complete" State.

    @event currentOrderDidComplete
    @param {DS.Model} order The Current Order.
  */

  /**
    A method called in the `yebo-ember-checkouts` initializer after the
    `Checkouts` mixin is applied to the Yebo service, to initialize functionality
    in this mixin.

    @method _restoreCurrentOrder
    @private
    @return {Boolean} Always resolves to `true`.
  */
  _restoreCurrentOrder: function() {
    this.restore();
    var orderId = this.get('orderId');

    return new Ember.RSVP.Promise((resolve) => {
      // Resolve here if no orderId
      if (Ember.isBlank(orderId)){
        resolve();
      }
      this.get('yebo.store').find('order', orderId).then((currentOrder) => {
        // Create the cart
        this.set('currentCart', new YeboSDK.Cart(currentOrder.get('number'), this.get('sessionAccount.user.token')));

        // Set the currentOrder
        this.set('currentOrder', currentOrder);
        return currentOrder;
        // return this.get('checkouts').transition(currentOrder.get('state'));
      }, (error) => {
        this.persist({
          guestToken: null,
          orderId: null
        });
        this.trigger('serverError', error);
        return error;
      }).finally(() => {
        resolve();
      });
    });
  },

  /**
    The token used to Authenticate the current user against the current order.  Persisted
    to local storage via `yebo-ember-core/mixins/storable`.  This property is
    sent to the Yebo server via the header `X-Yebo-Order-Token`.

    @property guestToken
    @type String
    @readOnly
    @default null
  */
  guestToken: null,

  /**
    The user's Current Order number, persisted to local storage via
    `yebo-ember-core/mixins/storable`.  This property is sent to the Yebo
    server via the header `X-Yebo-Order-Id`.

    @property orderId
    @type String
    @readOnly
    @default null
  */
  orderId: null,

  /**
    A reference to the Current Order.  It is only set twice in this code,
    once on Application initialization (in the case it was persisted), and once
    when a new order is created through the internal method `_createNewOrder`.

    @property currentOrder
    @type DS.Model
    @default null
  */
  currentOrder: null,

  /**
   * Reference to the YeboSDK cart,
   * this can be used to manage the currentCart.
   * Actions like add, remove and update line items are related to this
   * instance
   *
   * @property currentCart
   * @type YeboSDK.Cart
   * @default null
   */
  currentCart: null,

  /**
    A reference to the Stateful Checkouts service.

    @property checkouts
    @type Ember.Service
  */
  checkouts: Ember.inject.service('checkouts'),

  /**
   *
   */
  yebo: Ember.inject.service(),

  /**
   *
   */
  sessionAccount: Ember.inject.service(),

  /**
    Adds a lineItem to the currentOrder. If there is no Current Order,
    Yebo Ember will request a new order from the server, and set it as the
    Current Order on the Yebo service.

    @method addToCart
    @param {DS.Model} variant A class of the variant model
    @param {Integer} quantity Optional, A quantity for the Line Item.
    @return {Ember.RSVP.Promise} A promise that resolves to the newly saved Line Item.
  */
  addToCart: function(variant, quantity) {
    // Check if the cart is already initialized
    let cart = this.get('currentCart');
    let order = this.get('currentOrder');

    // Not initialized!
    if (cart === null || order === null) {
      // Initialize the cart
      return this._initializeCart().then(() => {
        // Add it!
        return this._addToCart(variant, quantity);
      });
    } else {
      // Everything is ready
      // Add it!
      return this._addToCart(variant, quantity);
    }
  },

  /**
   * Remote lineItem from the cart
   * @method
   * @public
   * @param {DS.Model} lineItem The lineItem model that will be removed
   * @return {Ember.RSVP.Promise} A promise that resolves to the saved Line Item.
   */
  removeFromTheCart: function(lineItem, qty) {
    // Check if the cart is already initialized
    let cart = this.get('currentCart');
    let order = this.get('currentOrder');

    // The cart and order should be already initialized
    if( cart === null || order === null )
      return;

    // Remove it!
    return new Ember.RSVP.Promise((resolve, reject) => {
      // Remove it using SDK
      cart.removeItem(lineItem.get('id'), qty).then((res) => {
        // Find the line item
        this.get('yebo.store').findRecord('lineItem', res.item.id).then((lineItem) => {
          // Reload the order
          order.reload();

          // Resolve it
          resolve(lineItem);
        });
      });
    });
  },

  /**
   * Empty the current cart
   */
  emptyCart: function() {
    // Current Cart
    let cart = this.get('currentCart');

    // Empty IT!!
    cart.empty().then(() => {
      // Update the order
      this.get('currentOrder').reload();
    });
  },

  /**
   * This method is used both to create an Order(currentOrder) for the other
   * sections of the application and the Cart(currentCart) that will be
   * used in the checkout area.
   *
   * @method _initializeCart
   * @private
   * in the initialization
   * @return {Ember.RSVP.Promise} A promise that resolves the cart initialized
   */
  _initializeCart() {
    // Start with the cart
    let cart = this.get('cart');

    // Initialize the cart
    cart = new YeboSDK.Cart(this.get('currentOrder.number'), this.get('sessionAccount.user.token'));
    // Put it in the instance
    this.set('currentCart', cart);

    return new Ember.RSVP.Promise((resolve, reject) => {
      // Find the cart order
      cart.order.then((response) => {
        // Check if the order is real
        if (response.real) {
          // Get the order
          this.get('yebo.store').find('order', response.number).then((order) => {
            // Set the order
            this.set('currentOrder', order);
            // Persist it to local storage
            this.persist({
              guestToken: order.get('guestToken'),
              orderId: order.get('id')
            });
            // Resolve the promise
            resolve(order);
          });
        } else {
          // The order does not exists!
          this.set('currentOrder', null);
        }
      }).catch(() => {
        this.clearCurrentOrder();

        reject();
      });
    });
  },

  /**
   * The method that really add to the cart
   * this was create to unify the method,
   * it does not matter how the currentCart and currentOrder were created.
   *
   * @method _addToCart
   * @private
   * @param {DS.Model} variant A class of the variant model
   * @param {Integer} quantity Optional, A quantity for the Line Item.
   * @return {Ember.RSVP.Promise} A promise that resolves to the newly saved Line Item.
   */
  _addToCart(variant, quantity) {
    // Get the two good guys
    let cart = this.get('currentCart');
    let order = this.get('currentOrder');

    // Add the variant to the cart using the SDK method
    return new Ember.RSVP.Promise((resolve, reject) => {
      cart.add(variant.get('id'), quantity).then((response) => {
        // Is the order real?
        // update order, but order might be huge
        // !this.get('currentOrder')
        if (response.order.real) {
          // Find it and set as the currentOrder
          // TODO: This response is huge, i can't do this in every request
          this.get('yebo.store').find('order', response.order.number).then((order) => {
            // Set the order
            this.set('currentOrder', order);
          });
        };
        // Find the line item
        this.get('yebo.store').findRecord('lineItem', response.item.id).then((lineItem) => {
          // Event
          this.trigger('didAddToCart', lineItem);
          // Finish!
          resolve(lineItem);
        }).catch((error) => {
          this.trigger('serverError', error);
          reject(error);
        });
      }).catch((error) => {
        this.trigger('serverError', error);
        reject(error);
      });
    });
  },

  /**
    An internal method for saving Line Items.  If it is called for a variant that
    is already in the current order, it will add to the corresponding Line Item's
    quantity, otherwise it will create a new Line Item for that variant.

    @method _saveLineItem
    @private
    @param {Ember.Object} variant A class of the variant model
    @param {Integer} quantity A quantity for the `lineItem`
    @param {Ember.Object} order The corresponding order
    @return {Ember.RSVP.Promise} A promise that resolves to the newly created or
    updated `lineItem` object.
  */
  _saveLineItem: function(variant, quantity, order) {
    var _this = this;
    var lineItem = order.get('lineItems').findBy('variant', variant);

    if (lineItem) {
      var currentQuantity = lineItem.get('quantity');
      lineItem.set('quantity', currentQuantity + quantity);
    } else {
      lineItem = this.store.createRecord('lineItem', {
        variant: variant,
        quantity: quantity
      });
    }

    return lineItem.save().then(
      function(lineItem) {
        _this.trigger('didAddToCart', lineItem);
        return lineItem;
      },
      function(error) {
        _this.trigger('serverError', error);
        return error;
      }
    );
  },

  /**
    Will attempt to create a new Order for the checkout user, and save the `orderId`
    and `guestToken` to the Yebo service, so that it will persist across page
    refreshes.  It will also initiate the state machine for the current order.

    @method _createNewOrder
    @private
    @return {Ember.RSVP.Promise} A promise that resolves to the newly created
    Yebo Order.
  */
  _createNewOrder: function() {
    var _this = this;
    return this.store.createRecord('order').save().then(
      function(newOrder) {
        _this.set('currentOrder', newOrder);
        _this.persist({
          guestToken: newOrder.get('guestToken'),
          orderId: newOrder.get('id')
        });
        _this.trigger('didCreateNewOrder', newOrder);
        _this.get('checkouts').transition(newOrder.get('state'));
        return newOrder;
      },
      function(error) {
        _this.trigger('newOrderCreateFailed', error);
        _this.trigger('serverError', error);
        return error;
      }
    );
  },

  /**
    Clears the current order and any reference to it.

    @method clearCurrentOrder
    @return {Boolean} Always returns `true`.
  */
  clearCurrentOrder: function(didComplete) {
    if (didComplete) {
      this.trigger('currentOrderDidComplete', this.get('currentOrder'));
    }
    this.persist({
      guestToken: null,
      orderId: null
    });
    this.set('currentOrder', null);
    this.set('currentCart', null);
    this.get('checkouts').transition();
    this.trigger('didClearCurrentOrder');
    return true;
  }
});
