# Yebo Ember Checkouts

[![Build Status](https://travis-ci.org/azclick/yebo-ember.svg?branch=master)](https://travis-ci.org/azclick/yebo-ember)
[![Join the chat at https://gitter.im/azclick/yebo-ember](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/azclick/yebo-ember?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

Yebo Ember Checkouts uses [Ember FSM]()
to define a Stateful Checkouts abstraction as a service for writing reactive
single page checkout flows.  It exclusively uses the [Yebo Checkouts API]()
with an Order Serializer to transiton an order to completion, and populate the
order's `DS.Errors` attribute when server validation fails.

This addon also adds `currentOrder` session support to the central yebo service.

**Note:** This Package is included with `yebo-ember-storefront`.  If you're
using that, there's no need to install this seperately.

It uses:
* [Yebo Ember Core](http://www.yebo-ember.com/core/index.html)
* [Ember FSM](https://github.com/heycarsten/ember-fsm)

## Installation

```bash
ember install yebo-ember-checkouts
```

For full Yebo Ember documentation, visit [http://www.yebo-ember.com/](http://www.yebo-ember.com).

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).

## Order Management

The `addToCart` function will create an order if one doesn't currently exist,
and then add a variant to cart.  You can optionally pass in a quantity, too!

```javascript
this.yebo.get('currentOrder');
// => null

var _this = this;
this.yebo.addToCart(variantModel).then(function() {
  _this.yebo.get('currentOrder.state');
  // => "cart"

  _this.yebo.clearCurrentOrder();
  _this.yebo.get('currentOrder');
  // => null
});
```

## Advancing an Order through the Checkout

All order state manipulation is done exclusively through the `transition`
function.  Under the hood, it triggers state transitions on the checkouts Finite
State Machine, to ensure the frontend state stays in sync with Yebo's Order
State Machine.

The Checkouts service is designed to allow a reactive style of programming for
the checkout flow, allowing the developer to focus on the User experience, and
trust that the internals of the State Machine will clear up and reconsolidate
user edge cases.

```javascript
var checkouts = this.yebo.get('checkouts');

checkouts.transition().then(
  function() {
    checkouts.get('currentState');
    // => "delivery"
    checkouts.get('currentOrder.state');
    // => "delivery"

    checkouts.transition("address").finally(function() {
      checkouts.get('currentState');
      // => "address"
      checkouts.get('currentOrder.state');
      // => "delivery"
    });
  }
);
```

In the above example, the Checkouts `currentState` diverges from the
`currentOrder` state when moving backward.  This is expected behaviour - the
states will reconsolidate when the order advances forward again.

**Note:** This is an example of why it's important to use the Checkouts service
as the canoncial state to represent in the UI, and not the `currentOrder`
directly.

## Subscribing to Checkout Events

The Yebo Checkouts package also supports a event bus / callback style
architecture.  This is useful for binding events to Google Analytics, and such.

```javascript
this.yebo.on('didAddToCart', function(lineItem) {
  alert(lineItem.get('variant.name') + " added to cart!");
});
```

#### **For more information, please see the [yebo-ember-checkouts API Documentation.](http://www.yebo-ember.com/checkouts/index.html)**
