import ENV from '../config/environment';
import YeboSerializer from 'yebo-ember-core/serializers/yebo';
import YeboAdapter from 'yebo-ember-core/adapters/yebo';

export function initialize(instance) {
  /* Register Yebo Utilities with the Container */
  instance.register('serializer:-yebo', YeboSerializer);
  instance.register('adapter:-yebo', YeboAdapter);

  /* Inject the Yebo Store into the Yebo Service */
  instance.inject('service:yebo', 'store', 'store:yebo');

  /* Inject the Yebo Service into Routes & Components */
  instance.inject('route', 'yebo', 'service:yebo');
  instance.inject('controller', 'yebo', 'service:yebo');
  instance.inject('component', 'yebo', 'service:yebo');

  /* Copy Environment and Yebo Configuration to Yebo Service */
  instance.container.lookup('service:yebo');
  YeboService.set('environment', ENV.environment);
  YeboService.set('config', ENV['yebo'] || {});

  // Config Yebo SDK
  YeboService.set('sdk:token', 'Token Not Yet Set');
  YeboSDK.Store.auth().then(function(token){
    YeboService.set('sdk:token', token );
  });
  YeboSDK.Config.set('store:url', ENV.yebo.apiHost)
  YeboSDK.Config.set('store:api:version', ENV.yebo.namespace)

  debugger;
}

export default {
  name: 'yebo-ember-core',
  initialize: initialize
};
