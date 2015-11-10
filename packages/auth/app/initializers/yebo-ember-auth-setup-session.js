export function initialize(app) {
  /* Inject the Session Service into Routes & Components */
  app.inject('route', 'session', 'session:main');
  app.inject('controller', 'session', 'session:main');
  app.inject('component', 'session', 'session:main');
}

export default {
  name: 'yebo-ember-auth-setup-session',
  after: 'ember-simple-auth',
  initialize: initialize
};
