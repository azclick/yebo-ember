import CurrentOrderSupportMixin from 'yebo-ember-checkouts/mixins/current-order-support';

export function initialize(instance) {
  var YeboService = instance.lookup('service:yebo');
  CurrentOrderSupportMixin.apply(YeboService);

  // App.deferReadiness();
  YeboService._restoreCurrentOrder().finally(function() {
    // Essa estancia HAHAHAHA
    App.advanceReadiness();
  });
}

export default {
  name: 'yebo-ember-checkouts',
  // after: "yebo-ember-core",
  after: 'ember-simple-auth',
  initialize: initialize
};
