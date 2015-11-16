import Ember from 'ember';
import DS from 'ember-data';

const { service } = Ember.inject;

export default Ember.Service.extend({
  session: service(),
  yebo: service(),

  user: Ember.computed('session.data.authenticated.user', function() {
    const token = this.get('session.data.authenticated.user.token');
    if (!Ember.isEmpty(token)) {
      return DS.PromiseObject.create({
        promise: this.get('yebo').get('store').find('user', token)
      });
    }
  })
});
