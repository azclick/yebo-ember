import Session from 'simple-auth/session';
import Authorizer from 'yebo-ember-auth/authorizers/yebo';
import Authenticator from 'yebo-ember-auth/authenticators/yebo';

export function initialize(container, application) {
  container.register('simple-auth-authorizer:yebo', Authorizer);
  container.register('simple-auth-authenticator:yebo', Authenticator);

  var YeboAuthorizer    = container.lookup('simple-auth-authorizer:yebo');
  var YeboAuthenticator = container.lookup('simple-auth-authenticator:yebo');
  var YeboAdapter       = container.lookup('adapter:-yebo');

  YeboAuthenticator.set('serverTokenEndpoint', YeboAdapter.buildURL('user')+'/token');
}

export default {
  name: 'yebo-ember-auth',
  before: 'simple-auth',
  after: 'yebo-ember-core',
  initialize: initialize
};
