import Ember from 'ember';
import config from './config/environment';
import yeboAuthRouter from 'yebo-ember-auth/router';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  yeboAuthRouter(this, config);
});

export default Router;
