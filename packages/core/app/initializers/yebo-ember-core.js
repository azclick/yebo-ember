import ENV from '../config/environment';
import YeboSerializer from 'yebo-ember-core/serializers/yebo';
import YeboAdapter from 'yebo-ember-core/adapters/yebo';

export function initialize(container, application) {
  /* Register Yebo Utilities with the Container */
  container.register('serializer:-yebo', YeboSerializer);
  container.register('adapter:-yebo', YeboAdapter);

  /* Inject the Yebo Store into the Yebo Service */
  application.inject('service:yebo', 'store', 'store:yebo');

  /* Inject the Yebo Service into Routes & Components */
  application.inject('route', 'yebo', 'service:yebo');
  application.inject('controller', 'yebo', 'service:yebo');
  application.inject('component', 'yebo', 'service:yebo');

  /* Copy Environment and Yebo Configuration to Yebo Service */
  var YeboService = container.lookup('service:yebo');
  YeboService.set('environment', ENV.environment);
  YeboService.set('config', ENV['yebo'] || {});

  // Config Yebo SDK
  YeboService.set('sdk:token', 'Token Not Yet Set');
  YeboSDK.Store.auth().then(function(token){
    YeboService.set('sdk:token', token );
  });

}

export default {
  name: 'yebo-ember-core',
  initialize: initialize
};
