export function initialize(app) {
  /* Inject the Session Service into Routes & Components */
  app.inject('route', 'session', 'session:main');
  app.inject('controller', 'session', 'session:main');
  app.inject('component', 'session', 'session:main');

  /* Inject the Session Service into Routes & Components */
  app.inject('route', 'sessionAccount', 'service:session-account');
  app.inject('controller', 'sessionAccount', 'service:session-account');
  app.inject('component', 'sessionAccount', 'service:session-account');
}

export default {
  name: 'yebo-ember-auth-setup-session',
  after: 'ember-simple-auth',
  initialize: initialize
};
