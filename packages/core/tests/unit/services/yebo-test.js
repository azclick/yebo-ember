import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('service:yebo', 'YeboService');

test('it exists', function(assert) {
  var service = this.subject();
  assert.ok(service);
});

test('it persists data to localStorage', function(assert) {
  window.localStorage.clear();

  var service = this.subject();
  service.persist({
    favoriteRapper: "Drake"
  });
  assert.equal(service.get("favoriteRapper"), "Drake");

  service.set("favoriteRapper", null);

  service.restore();
  assert.equal(service.get("favoriteRapper"), "Drake");
});

test('it has the yebo entry of the environment config', function(assert) {
  var service = this.subject();
  assert.ok(service.config);
});
