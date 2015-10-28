import CurrentOrderSupportMixin from 'yebo-ember-checkouts/mixins/current-order-support';

export function initialize(container, application) {
  var YeboService = container.lookup('service:yebo');
  CurrentOrderSupportMixin.apply(YeboService);

  application.deferReadiness();
  YeboService._restoreCurrentOrder().finally(function() {
    application.advanceReadiness();
  });
}

export default {
  name: 'yebo-ember-checkouts',
  after: "yebo-ember-core",
  initialize: initialize
};
