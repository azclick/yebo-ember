import Authorizer from 'yebo-ember-auth/authorizers/yebo';
import Authenticator from 'yebo-ember-auth/authenticators/yebo';

export function initialize(app) {
  app.register('ember-simple-auth-authorizer:yebo', Authorizer);
  app.register('ember-simple-auth-authenticator:yebo', Authenticator);
}

export default {
  name: 'yebo-ember-auth',
  before: 'ember-simple-auth',
  after: 'yebo-ember-core',
  initialize: initialize
};
