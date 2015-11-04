
export function initialize(instance) {
  var YeboAdapter = instance.container.lookup('adapter:-yebo');
  var Session = instance.container.lookup('simple-auth-session:main');

  Session.reopen({
    currentUser: null,

    secureIdDidChange: Ember.observer('secure.id', function() {
      var userId = this.get('secure.id');
      if (userId) {
        var _this = this;
          instance.lookup('service:yebo').store.find('user', userId).then(
          function(currentUser) {
            _this.set('currentUser', currentUser);
          },
          function(error) {
            _this.invalidate();
          }
        );
      }
    })
  });
}

export default {
  name: 'yebo-ember-auth-setup-session',
  after: ['yebo-ember-core', 'simple-auth', 'yebo-ember-auth'],
  initialize: initialize
};
