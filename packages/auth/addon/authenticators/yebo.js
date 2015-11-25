import Ember from 'ember';
import BaseAuthenticator from 'ember-simple-auth/authenticators/base';

export default BaseAuthenticator.extend({
  yebo: Ember.inject.service(),

  serverEndpoint: null,

  restore: function(data) {
    return new Ember.RSVP.Promise(function(resolve, reject) {
      if (!Ember.isEmpty(data.user.token)) {
        resolve(data);
      } else {
        reject();
      }
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
        this.restoreOrder(response.user);

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

  restoreOrder: function(user){
    let yebo = this.get("yebo");

    if(!user.order.number || yebo.get("currentOrder.number")){
      return false;
    } else {

      // Persist it to local storage
      yebo.persist({
        guestToken: user.token,
        orderId: user.order.number
      });

      yebo._restoreCurrentOrder();
    }
  }
});
