import Ember from 'ember';
import {
  module,
  test
} from 'qunit';
import startApp from '../helpers/start-app';

var application;

module('Acceptance: Signin', {
  beforeEach: function() {
    window.localStorage.clear();
    application = startApp();
  },

  afterEach: function() {
    Ember.run(application, 'destroy');
  }
});

test('cant get to account unless authenticated', function(assert) {
  visit('/account');

  andThen(function() {
    assert.equal(currentPath(), 'yebo.signin');
    fillIn('input[placeholder="Email"]', 'yebo-ember@example.com');
    fillIn('input[placeholder="Password"]', 'yebo123');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.equal(currentPath(), 'yebo.account');
  });
});


test('once authenticated, cant get to auth routes', function(assert) {
  visit('/signin');

  andThen(function() {
    assert.equal(currentPath(), 'yebo.signin');
    fillIn('input[placeholder="Email"]', 'yebo-ember@example.com');
    fillIn('input[placeholder="Password"]', 'yebo123');
    click('button[type="submit"]');
  });

  andThen(function() {
    assert.equal(currentPath(), 'yebo.account');
  });

  andThen(function() {
    visit('/signin');
  });

  andThen(function() {
    assert.equal(currentPath(), 'yebo.account');
  });
  
  andThen(function() {
    visit('/signup');
  });

  andThen(function() {
    assert.equal(currentPath(), 'yebo.account');
  });
});
