import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
/**
  The thanks route.

  @class Thanks
  @namespace Route
  @extends Ember.Component
  */
export default Ember.Route.extend(AuthenticatedRouteMixin, {
  redirect: function(model) {
    // TODO: if order empty redirect to ? when route is checkout
    // if(this.get("yebo.orderId") === null){
    //   // redirect if order not completed
    //   this.transitionTo('yebo.signin');
    // }
  },
});
