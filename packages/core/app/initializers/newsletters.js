//
export function initialize(app) {
  // Inject the Newsletters service into the yebo service
  app.inject('service:yebo', 'newsletters', 'service:newsletters');
}

//
export default {
  name: 'yebo-ember-newsletters',
  initialize: initialize
};
