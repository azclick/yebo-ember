import Session from 'yebo-ember-auth/services/session';
import setupSession from 'ember-simple-auth/initializers/setup-session';
import setupSessionService from 'ember-simple-auth/initializers/setup-session-service';

export function initialize(app) {
  setupSession(app);
  setupSessionService(app);
  /* Register Custom Session */
  // app.register('service:session', Session);

  /* Inject the Session Service into Routes & Components */
  app.inject('route', 'session', 'service:session');
  app.inject('controller', 'session', 'service:session');
  app.inject('component', 'session', 'service:session');
}

export default {
  name: 'yebo-ember-auth-setup-session',
  after: 'ember-simple-auth',
  initialize: initialize
};
