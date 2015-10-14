import Ember from 'ember';
import StorableMixin from 'yebo-ember-core/mixins/storable';
import { module, test } from 'qunit';

module('StorableMixin');

test('it works', function(assert) {
  window.localStorage.clear();

  var StorableObject = Ember.Object.extend(StorableMixin, {
    localStorageKey: "yebo-ember-testing" 
  });
  var subject = StorableObject.create();
  assert.ok(subject);

  subject.persist({
    favoriteBand: "Seekae"
  });

  assert.equal(window.localStorage.getItem("yebo-ember-testing"), '{"favoriteBand":"Seekae"}');
  assert.equal(subject.get("favoriteBand"), "Seekae");
  
  subject.persist({
    favoriteBand: null
  });

  assert.equal(window.localStorage.getItem("yebo-ember-testing"), '{}');
  assert.equal(subject.get("favoriteBand"), null); 
});

test('it should overwrite persisted values', function(assert) {
  window.localStorage.clear();

  var StorableObject = Ember.Object.extend(StorableMixin, {
    localStorageKey: "yebo-ember-testing" 
  });
  var subject = StorableObject.create();
  assert.ok(subject);

  window.localStorage.setItem("yebo-ember-testing", '{"favoriteBand":"Beacon"}');

  subject.persist({
    favoriteBand: "Seekae"
  });

  assert.equal(window.localStorage.getItem("yebo-ember-testing"), '{"favoriteBand":"Seekae"}');
  assert.equal(subject.get("favoriteBand"), "Seekae");
  
  subject.persist({
    favoriteBand: null
  });

  assert.equal(window.localStorage.getItem("yebo-ember-testing"), '{}');
  assert.equal(subject.get("favoriteBand"), null); 
});

test('it should merge with persisted values', function(assert) {
  window.localStorage.clear();

  var StorableObject = Ember.Object.extend(StorableMixin, {
    localStorageKey: "yebo-ember-testing" 
  });
  var subject = StorableObject.create();
  assert.ok(subject);

  window.localStorage.setItem("yebo-ember-testing", '{"favoriteRapper":"Drake"}');
  
  subject.persist({
    favoriteBand: "Seekae"
  });

  assert.equal(window.localStorage.getItem("yebo-ember-testing"), '{"favoriteRapper":"Drake","favoriteBand":"Seekae"}');
  assert.equal(subject.get("favoriteBand"), "Seekae");
});

test('it should restore persisted values', function(assert) {
  var StorableObject = Ember.Object.extend(StorableMixin, {
    localStorageKey: "yebo-ember-testing" 
  });
  var subject = StorableObject.create();
  assert.ok(subject);

  window.localStorage.setItem("yebo-ember-testing", '{"favoriteBand":"Beacon"}');
  subject.restore();
  assert.equal(subject.get("favoriteBand"), "Beacon");
});
