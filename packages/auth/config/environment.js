'use strict';

module.exports = function(/* environment, appConfig */) {
  return {
    "yebo": {
      signinPath: 'signin',
      signupPath: 'signup',
      accountPath: 'account'
    },
    "simple-auth": {
      localStorageKey: 'yebo-ember:session',
      authorizer: 'simple-auth-authorizer:yebo',
      crossOriginWhitelist: ['http://localhost:3000'],
      authenticationRoute: 'yebo.signin',
      routeAfterAuthentication: "yebo.account",
      routeIfAlreadyAuthenticated: "yebo.account"
    }
  };
};
