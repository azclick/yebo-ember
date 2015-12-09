import Ember from 'ember';
import ActiveModelAdapter from 'active-model-adapter';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

/**
  The Yebo Adapter is responsible for communicating with your Yebo store.  It
  assumes your server has the `yebo_ams` gem installed.

  @class Yebo
  @namespace Adapter
  @extends ActiveModelAdapter
*/
export default ActiveModelAdapter.extend(DataAdapterMixin, {
  // TODO: Remove this dependecy, make it injectable in the proper package
  authorizer: 'ember-simple-auth-authorizer:jwt',


  /*
    By default the RESTAdapter will send each find request coming from a
    store.find or from accessing a relationship separately to the server.
    If your server supports passing ids as a query string,
    you can set coalesceFindRequests to true to coalesce all find requests within
    a single runloop.
  */
  // coalesceFindRequests: true

  /**
    The container lookup name for the default Yebo serializer.

    @property defaultSerializer
    @type String
    @readOnly
    @default '-yebo'
  */
  defaultSerializer: '-yebo',
  /**
    A refernce to the Yebo Service.

    @property yebo
    @type Subclass of Ember.Service
    @readOnly
  */
  yebo: Ember.inject.service("yebo"),
  /**
    A computed property for the server namespace.  If it's not set in the Host
    Application's yebo configuration by `yebo.apiNamespace`, it will default to
    `api/ams`, to work out of the box with the `yebo_ams` Gem.

    @property namespace
    @type String
    @readOnly
    @default 'api/ams'
  */
  namespace: Ember.computed('yebo.config.apiNamespace', function() {
    var namespace = this.get('yebo.config.namespace');
    return namespace || 'api/v2';
  }),
  /**
    A computed property for the server host.  If it's not set in the Host Application's
    yebo configuration by `yebo.apiHost`, it will default to 'http://localhost:3000'
    in all environments aside from test, where it will default to `null` (to satisfy
    Pretender).

    @property host
    @type String
    @readOnly
    @default 'http://localhost:3000'
  */
  host: Ember.computed('yebo.config.apiHost', function() {
    var host = this.get('yebo.config.apiHost');
    if (host) {
      return host;
    } else {
      var environment = this.get('yebo.environment');
      if (environment === "test") {
        host = null;
      } else {
        host = 'http://localhost:3000';
      }
      return host;
    }
  }),

  /**
    A computed property for the adapter headers.  We use these headers to authenticate
    the user against the order we're trying to modify.  The `yebo_ams` gem will
    look for these, and do the work here.

    @property headers
    @type String
    @readOnly
    @default {}
  */
  headers: Ember.computed('yebo.currentOrder', function() {
    let order = this.get('yebo.currentOrder');

    if (order) {
      return {
        "X-Yebo-Order-Token": order.get('guestToken'),
        "X-Yebo-Order": order.get('number'),
      };
    }
  }),


  /**
    Overrides the default buildURL call to check for the `_useCheckoutsEndpoint`
    on the snapshot, (applied to `order` models in the `CanCheckout` mixin). If
    so, the resulting URL will be `{hostname}/{namespace}/checkouts/{record_id}`.
    If the flag isn't present, `_super` is called and the record URL is built
    normally.

    @method buildURL
  */
  buildURL: function(record, suffix, snapshot, requestType) {
    if (record === "order" && snapshot && snapshot.attr('_useCheckoutsEndpoint')) {
      record = "checkout";
    }
    return this._super.apply(this, [record, suffix, snapshot, requestType]);
  },
});
