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
    if (!this.get('currentCart')) {
      this.set('currentCart', new YeboSDK.Cart());
    }

    this.restore();
    var _this = this;
    var orderNumber = this.get('orderNumber');

    return new Ember.RSVP.Promise(function(resolve) {
      if (orderNumber) {
        _this.store.find('order', orderNumber).then(function(currentOrder) {
            _this.set('currentOrder', currentOrder);
            return _this.get('checkouts').transition(currentOrder.get('state'));
          }, function(error) {
            _this.persist({
              guestToken: null,
              orderNumber: null
            });
            _this.trigger('serverError', error);
            return error;
          }
        ).finally(function() {
          resolve();
        });
      } else {
        resolve();
      }
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

    @property orderNumber
    @type String
    @readOnly
    @default null
  */
  orderNumber: null,

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
    A reference to the Current Cart.

    @property currentCart
    @type { }
    @default null
  */
  currentCart: null,

  /**
    A reference to the Stateful Checkouts service.

    @property checkouts
    @type Ember.Service
  */
  checkouts: Ember.inject.service('checkouts'),

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
    var _this = this;
    quantity = quantity || 1;

    return this.get('currentCart').add(variant, quantity).then(function(cart) {
      _this.set("orderNumber", cart.order.number);
      _this.set("guestToken", cart.order.token);

      // Set currentOrder to null to force update of the object
      _this._findOrder(cart.order.number);
    });
  },

  /**
    Will attempt to create a new Order for the checkout user, and save the `orderNumber`
    and `guestToken` to the Yebo service, so that it will persist across page
    refreshes.  It will also initiate the state machine for the current order.

    @method _createNewOrder
    @private
    @return {Ember.RSVP.Promise} A promise that resolves to the newly created
    Yebo Order.
  */
  _findOrder: function(orderNumber) {
    var _this = this;

    return this.store.find('order', orderNumber).then(function(newOrder) {
      _this.set('_currentOrder', newOrder);
      _this.persist({
        guestToken: newOrder.get('guestToken'),
        orderNumber: newOrder.get('id')
      });
      _this.trigger('didCreateNewOrder', newOrder);
      _this.get('checkouts').transition(newOrder.get('state'));
      return newOrder;
    }, function(error) {
      _this.trigger('newOrderCreateFailed', error);
      _this.trigger('serverError', error);
      return error;
    });
  },
});
