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
    // TODO: redirect if order not completed
    // this.transitionTo('yebo.index');
  },
});
