import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import UserRouteActions from 'yebo-ember-auth/mixins/user-route-actions';

export default Ember.Route.extend(AuthenticatedRouteMixin, UserRouteActions);
