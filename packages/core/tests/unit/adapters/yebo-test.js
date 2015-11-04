import Ember from 'ember';
import DS from 'ember-data';
import CanCheckoutMixin from 'yebo-ember-core/mixins/can-checkout';
import {
  moduleFor,
  test
} from 'ember-qunit';

moduleFor('adapter:yebo', 'YeboAdapter', {
  needs: ['store:yebo', 'serializer:yebo', 'service:yebo']
});

test('it exists', function(assert) {
  var adapter = this.subject();
  assert.ok(adapter);
});

test('it builds checkouts URL if the order record has the _userCheckoutsEndpoint flah', function(assert) {
  var adapter = this.subject();
  assert.ok(adapter);

  var store = this.container.lookup("store:yebo");
  var Order = DS.Model.extend(CanCheckoutMixin);
  this.container.register("model:order", Order);
  
  Ember.run(function() {
    var newOrder = store.createRecord("order", {
      id: "R12345678",
      _useCheckoutsEndpoint: true
    });

    var snapshot = newOrder._createSnapshot();
    var URL = adapter.buildURL("order", newOrder.get('id'), snapshot);
    assert.equal(URL, "http://localhost:3000/api/ams/checkouts/R12345678");

    var anotherOrder = store.createRecord("order", {
      id: "P12345678"
    });
    
    var anotherSnapshot = anotherOrder._createSnapshot();
    var anotherURL = adapter.buildURL("order", anotherOrder.get('id'), anotherSnapshot);
    assert.equal(anotherURL, "http://localhost:3000/api/ams/orders/P12345678");
  });
});

test('it manages headers for the current order', function(assert) {
  var adapter = this.subject();
  assert.ok(adapter);

  var yebo = adapter.get('yebo');

  yebo.persist({
    guestToken: "guest12345",
    orderId: "R123456"
  });
  
  var headers = adapter.get("headers");

  assert.equal(headers['X-Yebo-Order-Id'], "R123456");
  assert.equal(headers['X-Yebo-Order-Token'], "guest12345");
  
  yebo.persist({
    guestToken: null,
    orderId: null
  });
  
  var newHeaders = adapter.get("headers");

  assert.ok(Ember.isNone(newHeaders["X-Yebo-Order-Id"]));
  assert.ok(Ember.isNone(newHeaders["X-Yebo-Order-Token"]));
});
