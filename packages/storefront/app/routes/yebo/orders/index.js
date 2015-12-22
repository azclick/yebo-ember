import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { service } = Ember.inject;

/**
 * User orders route
 */
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  // sessionAccount: service(),

  model: function(params) {
    return new Ember.RSVP.Promise((resolve, reject)=>{
      this.get("sessionAccount.user").then((currentUser)=>{
        let token = currentUser.get("token");
        let orders = this.yebo.store.query('order', { token: token } );
        resolve(orders);
      });
    });
  }
});
