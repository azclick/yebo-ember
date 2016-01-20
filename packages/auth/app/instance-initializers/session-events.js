import Configuration from 'ember-simple-auth/configuration'

export function initialize(instance) {
  var applicationRoute = instance.lookup('route:application');
  var session = instance.lookup('service:session');
  var yebo = instance.lookup('service:yebo');

  session.on('authenticationSucceeded', function() {
    yebo.restore();

    if(yebo.get("orderId")) {
      applicationRoute.transitionTo("yebo.checkout");
    } else {
      applicationRoute.transitionTo("yebo.account");
    }
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
