import Session from 'simple-auth/session';
import Authorizer from 'yebo-ember-auth/authorizers/yebo';
import Authenticator from 'yebo-ember-auth/authenticators/yebo';

export function initialize(app) {
  app.register('simple-auth-authorizer:yebo', Authorizer);
  app.register('simple-auth-authenticator:yebo', Authenticator);
}

export default {
  name: 'yebo-ember-auth',
  before: 'simple-auth',
  after: 'yebo-ember-core',
  initialize: initialize
};
