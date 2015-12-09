import ENV from '../config/environment';
import YeboSerializer from 'yebo-ember-core/serializers/yebo';
import YeboAdapter from 'yebo-ember-core/adapters/yebo';

export function initialize(instance) {
  /* Copy Environment and Yebo Configuration to Yebo Service */
  var YeboService = instance.lookup('service:yebo');
  YeboService.set('environment', ENV.environment);
  YeboService.set('config', ENV['yebo'] || {});
}

export default {
  name: 'yebo-ember-core',
  initialize: initialize
};
