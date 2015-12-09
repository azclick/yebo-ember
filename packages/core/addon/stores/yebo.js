import Ember from 'ember';
import DS from 'ember-data';

/**
  The Yebo Store is what connects the Yebo Serializer & Adapter.  It's injected
  in the `yebo` service, so that we can effectively isolate Yebo Ember's data from
  the Host Application's regular Store, Adapter & Serializer.  This is useful
  for Rails Applications that have Yebo added, but have regular endpoints that
  don't hit the Yebo endpoint.

  @class Yebo
  @namespace Store
  @module yebo-ember-core/stores/yebo
  @uses YeboEmber.Adapter, YeboEmber.Serializer, Ember.Evented
  @extends DS.Store
*/
export default DS.Store.extend({
  /**
    The container lookup name for the Yebo adapter.

    @property adapter
    @type String
    @readOnly
    @default '-yebo'
  */
  adapter: '-yebo',

  /**
    The container lookup name for the default Yebo serializer.

    @property defaultSerializer
    @type String
    @readOnly
    @default '-yebo'
  */
  defaultSerializer: '-yebo',

  /**
    Always returns the Yebo Adapter.

    @method adapterFor
    @return {YeboEmber.Adapter} The Yebo Ember Adapater.
  */
  adapterFor: function() {
    return this.container.lookup('adapter:-yebo');
  },

  /**
    Attempts to find a registered serializer for the type, but in the case it doesn't
    find one, it will return the default Yebo serializer.

    @method serializerFor
    @return {Serializer} A serializer.
  */
  serializerFor: function(modelName) {
    var fallbacks = ['application', this.adapterFor(modelName).get('defaultSerializer'), '-default'];
    return this.lookupSerializer(modelName, fallbacks);
  },

  /**
    Find a model by it's `slug` attribute.

    @example
    ```javascript
    // Products Show Route
    import Ember from 'ember';

    export default Ember.Route.extend({
      model: function(params) {
        return this.yebo.store.findBySlug('product', params.slug);
      }
    });
    ```

    @method findBySlug
    @param {String} type A model type
    @param {String} slug The model's slug
    @return {YeboEmber.Adapter} The Yebo Ember Adapater.
  */
  findBySlug: function(type, slug) {
    Ember.assert("You need to pass a type to the store's findBySlug method", arguments.length >= 1);
    Ember.assert("You need to pass a slug to the store's findBySlug method", arguments.length >= 2);

    var store = this;
    var model = this.modelFor(type);
    var adapter = this.adapterFor(model);
    var serializer = this.serializerFor(type);

    var promise = adapter.findRecord(store, model, slug, null);

    return promise.then(
      function(adapterPayload) {
        var model = store.modelFor(type);
        var payload = serializer.normalizeResponse(store, model, adapterPayload, slug, 'findRecord');
        return store.push(payload);
      },
      function(error) {
        throw Error(error);
      }
    );
  }
});
