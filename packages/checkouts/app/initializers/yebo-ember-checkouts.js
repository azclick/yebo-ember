import CurrentOrderSupport from 'yebo-ember-checkouts/mixins/current-order-support';

export function initialize(container, application) {
  var YeboService = container.lookup('service:yebo');
  CurrentOrderSupport.apply(YeboService);

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
