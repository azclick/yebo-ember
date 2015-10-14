import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Router', {
  beforeEach: function() {
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('sanity check', function(assert) {
  visit('/');
  
  andThen(function() {
    assert.equal(currentPath(), 'yebo.index');
  });
});

test('products index', function(assert) {
  visit('/products');
  
  andThen(function() {
    assert.equal(currentPath(), 'yebo.products.index');
  });
});

test('products show', function(assert) {
  visit('/products/ruby-on-rails-baseball-jersey');
  
  andThen(function() {
    assert.equal(currentPath(), 'yebo.products.show');
  });
});

test('taxons show', function(assert) {
  visit('/t/categories/bags');
  
  andThen(function() {
    assert.equal(currentPath(), 'yebo.taxons.index');
  });
});

