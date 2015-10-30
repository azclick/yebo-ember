import ENV from '../config/environment';
import YeboSerializer from 'yebo-ember-core/serializers/yebo';
import YeboAdapter from 'yebo-ember-core/adapters/yebo';

export function initialize(instance) {
  /* Copy Environment and Yebo Configuration to Yebo Service */
  var YeboService = instance.container.lookup('service:yebo');
  YeboService.set('environment', ENV.environment);
  YeboService.set('config', ENV['yebo'] || {});

  // Config Yebo SDK
  YeboService.set('sdk:token', 'Token Not Yet Set');
  YeboSDK.Store.auth().then(function(token){
    YeboService.set('sdk:token', token );
  });
  YeboSDK.Config.set('store:url', ENV.yebo.apiHost);
  YeboSDK.Config.set('store:api:version', ENV.yebo.namespace);
}

export default {
  name: 'yebo-ember-core',
  initialize: initialize
};

// moduleName == "sandbox/initializers/yebo-ember-core" || moduleName ==  "sandbox/instance-initializers/ember-simple-auth"
