import DeviseAuthorizer from 'ember-simple-auth/authorizers/devise';
import Ember from 'ember';
/**
  The Authorizer is responsible for ensuring that each Authorized clientside request
  contains the `X-Yebo-Token` Header.  This loads the `@current_api_user`
  attribute in Yebo, so that the User can successfully interact with the API.

  @class Yebo
  @namespace Authorizer
  @extends SimpleAuthDevise.Authorizer
*/
export default DeviseAuthorizer.extend({
  /**
    The token attribute name.  The Yebo AMS Gem uses `token`.

    @property tokenAttributeName
    @type String
    @default 'token'
  */
  tokenAttributeName: 'token',
  /**
    Authorizes an XHR request by sending the `X-Yebo-Token` header when the
    `session` is Authenticated.

    @method authorize
    @param {jqXHR} jqXHR The XHR request to authorize (see http://api.jquery.com/jQuery.ajax/#jqXHR)
  */
  authorize: function(jqXHR) {
    var secureData = this.get('session.secure');
    var userToken = secureData[this.tokenAttributeName];
    if (this.get('session.isAuthenticated') && !Ember.isEmpty(userToken)) {
      jqXHR.setRequestHeader('X-Yebo-Token', userToken);
    }
  }
});
