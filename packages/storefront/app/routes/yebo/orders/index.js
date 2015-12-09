import Ember from 'ember';
const { service } = Ember.inject;

export default Ember.Route.extend({
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
