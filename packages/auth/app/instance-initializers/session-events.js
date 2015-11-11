import Configuration from 'ember-simple-auth/configuration'

export function initialize(instance) {
  var applicationRoute = instance.lookup('route:application');
  var session = instance.lookup('service:session');

  session.on('authenticationSucceeded', function() {
    applicationRoute.transitionTo(Configuration.routeAfterAuthentication);
  });
  session.on('invalidationSucceeded', function() {
    window.location.reload();
  });
}

export default {
  name: 'session-events',
  after: 'ember-simple-auth',
  initialize: initialize
};
