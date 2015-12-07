import Ember from 'ember';
import BaseAuthorizer from 'ember-simple-auth/authorizers/base';

export default BaseAuthorizer.extend({
  authorize: function(jqXHR, requestOptions) {
    YeboSDK.Store.auth().then((accessToken)=> {
      if (!Ember.isEmpty(accessToken)) {
        jqXHR.setRequestHeader('Authorization', 'Bearer ' + accessToken);
      }
    })
  }
});
