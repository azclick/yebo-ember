export function initialize(instance) {
  var YeboAuthorizer    = instance.container.lookup('ember-simple-auth-authorizer:yebo');
  var YeboAuthenticator = instance.container.lookup('ember-simple-auth-authenticator:yebo');
  var YeboAdapter       = instance.container.lookup('adapter:-yebo');

  YeboAuthenticator.set('serverTokenEndpoint', YeboAdapter.buildURL('user')+'/token');
}

export default {
  name: 'yebo-ember-auth',
  before: 'ember-simple-auth',
  after: 'yebo-ember-core',
  initialize: initialize
};
