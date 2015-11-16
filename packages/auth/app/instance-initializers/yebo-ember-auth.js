export function initialize(instance) {
  var YeboAuthorizer = instance.lookup('ember-simple-auth-authorizer:yebo');
  var YeboAuthenticator = instance.lookup('ember-simple-auth-authenticator:yebo');
  var YeboAdapter = instance.lookup('adapter:-yebo');

  // TODO: Fix this
  YeboAuthenticator.set('serverEndpoint', YeboAdapter.buildURL('user') + '/login');
}

export default {
  name: 'yebo-ember-auth',
  before: 'ember-simple-auth',
  after: 'yebo-ember-core',
  initialize: initialize
};
