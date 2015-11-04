import DeviseAuthenticator from 'ember-simple-auth/authenticators/devise';
/**
  The Yebo Authenticator is responsible for Authenticating users against  your
  Yebo store.  It assumes your server has the `yebo_ams` gem installed.  The Yebo
  Auth initializer with dynamically create and set the Server Token Endpoint from
  the Yebo Core Adapter.

  @class Yebo
  @namespace Authenticator
  @extends SimpleAuthDevise.Authenticator
*/
export default DeviseAuthenticator.extend({
  /**
    The endpoint where the Authenticator will attempt to Authenticate Users.  This
    is set dynamically by the `yebo-ember-auth` initializer, by building a URL
    from the `yebo-ember-core` adapter.

    @property serverTokenEndpoint
    @type String
    @readOnly
    @default 'http://localhost:3000/api/ams/users/token'
  */
  serverTokenEndpoint: 'http://localhost:3000/api/v2/users/token',
  /**
    The Rails Resource that we're authenticating.  When using Yebo's
    `yebo-auth-devise`, this is simply `user`.

    @property resourceName
    @type String
    @readOnly
    @default 'user'
  */
  resourceName: 'user',
  /**
    The name of the unique key returned by the server on a successful authentication.

    @property tokenAttributeName
    @type String
    @readOnly
    @default 'token'
  */
  tokenAttributeName: 'token',
  /**
    The name of the identification attribute of the user.  By default in Yebo,
    this is email.

    @property indentificationAttributeName
    @type String
    @readOnly
    @default 'email'
  */
  identificationAttributeName: 'email'
});
