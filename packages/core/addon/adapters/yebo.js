import Ember from 'ember';
import ActiveModelAdapter from 'active-model-adapter';

/**
  The Yebo Adapter is responsible for communicating with your Yebo store.  It
  assumes your server has the `yebo_ams` gem installed.

  @class Yebo
  @namespace Adapter
  @extends ActiveModelAdapter
*/
export default ActiveModelAdapter.extend({
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
    return namespace || 'api/ams';
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
  headers: Ember.computed('yebo.guestToken', 'yebo.orderId', function() {
    var guestToken = this.get('yebo.guestToken');
    var orderId = this.get('yebo.orderId');
    var token = "";

    if (guestToken && orderId) {
      return {
        "X-Spree-Order-Token": guestToken,
        "X-Spree-Order-Id": orderId,
        "Authorization": ["Bearer", token].join(" ")
      };
    } else {
      return {
        "Authorization": ["Bearer", token].join(" ")
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
    if (record === "order" && snapshot.attr('_useCheckoutsEndpoint')) {
      record = "checkout";
    }
    return this._super.apply(this, [record, suffix, snapshot, requestType]);
  },
});
