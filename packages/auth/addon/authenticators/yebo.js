import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  yebo: Ember.inject.service(),

  serverEndpoint: null,

  restore: function(data) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      // Check if the user is logged
      if (!Ember.isEmpty(data.user.token)) {
        resolve(data);
      } else {
        reject();
      }

      // Trigger an event
      this.get('yebo').instanciateCart(data);
    });
  },

  authenticate: function(options) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$.ajax({
        url: this.serverEndpoint,
        type: 'POST',
        data: JSON.stringify({
          user: options.identification,
          password: options.password,
          order_token: options.orderToken
        }),
        contentType: 'application/json;charset=utf-8',
        dataType: 'json'
      }).then((response) => {
        // Restore the order
        this.restoreOrder(response);

        // Resolve it
        Ember.run(function() {
          resolve(response);
        });
      }, (xhr, status, error)=> {
        Ember.run(function() {
          reject(xhr.responseJSON || xhr.responseText);
        });
      });
    });
  },

  invalidate: function() {
    let yebo = this.get("yebo");

    // Persist it to local storage
    yebo.restore();
    yebo.persist({
      guestToken: null,
      orderId: null
    });

    yebo.set('currentOrder', null);
    yebo.set('currentCart', null);
    yebo.set('orderId', null);
    yebo.set('guestToken', null);

    console.log('invalidate...');
    return Ember.RSVP.resolve();
  },

  restoreOrder: function(data){
    // Yebo instance
    let yebo = this.get("yebo");

    // Check if there is any order
    if( !data.user.order.number )
      return false;

    // Persist it to local storage
    yebo.persist({
      guestToken: data.user.token,
      orderId: data.user.order.number
    });

    // Instanciate the cart
    yebo.instanciateCart(data);
  }
});
