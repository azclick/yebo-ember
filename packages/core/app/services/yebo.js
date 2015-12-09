import Ember from 'ember';
import Storable from 'yebo-ember-core/mixins/storable';

/**
  The Yebo service is the central place a Yebo Ember developer will interact
  with Yebo, via Yebo Ember.  The core object is injected into the host application's
  routes & controllers, and is responsible for persisting data to Local Storage,
  communicating with your Yebo backend, Acting as a Registry for other Yebo Ember
  packages, and Acting as an Event Bus for your application Frontend, and providing
  a seperate Store.

  @class Yebo
  @namespace Service
  @module yebo-ember-core/services/yebo
  @extends Ember.Object
  @uses Ember.Evented, YeboEmber.Storable, YeboEmber.Store
*/

export default Ember.Service.extend(Ember.Evented, Storable, {
  /**
    The Local Storage key we use to Restore and Persist data across browser refreshes.

    @property localStorageKey
    @type String
    @default "yebo-ember"
  */

  localStorageKey: 'yebo-ember',
  /**
    A computed property that returns all of the countries (and states) set up in
    Yebo's backend.

    @property countries
    @type Computed
    @return {Ember.RSVP.Promise} Returns a promise that resolves to all of the
    countries saved in the Yebo backend.
  */
  countries: Ember.computed(function() {
    return this.store.findAll('country');
  }),

  /**
    A copy of the "yebo" entry in the Host Application environment config.

    @property config
    @type Object
    @default {}
  */
  config: {},

  /**
    A copy of the Host Application's current environment name.

    @property environment
    @type Object
    @default 'development'
  */
  environment: 'development'
});
