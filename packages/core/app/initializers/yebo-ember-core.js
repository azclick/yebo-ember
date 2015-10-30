import ENV from '../config/environment';
import YeboSerializer from 'yebo-ember-core/serializers/yebo';
import YeboAdapter from 'yebo-ember-core/adapters/yebo';

export function initialize(app) {
  /* Register Yebo Utilities with the Container */
  app.register('serializer:-yebo', YeboSerializer);
  app.register('adapter:-yebo', YeboAdapter);

  /* Inject the Yebo Store into the Yebo Service */
  app.inject('service:yebo', 'store', 'store:yebo');

  /* Inject the Yebo Service into Routes & Components */
  app.inject('route', 'yebo', 'service:yebo');
  app.inject('controller', 'yebo', 'service:yebo');
  app.inject('component', 'yebo', 'service:yebo');

  /* HAHAHAHAHAHAHAHA */
  window.App = app;
}

export default {
  name: 'yebo-ember-core',
  initialize: initialize
};
