//
export function initialize(app) {
  // Inject the Products service into the yebo service
  app.inject('service:yebo', 'products', 'service:products');
}

//
export default {
  name: 'yebo-ember-products',
  initialize: initialize
};
