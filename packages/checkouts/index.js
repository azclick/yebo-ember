/* jshint node: true */
'use strict';

module.exports = {
  name: 'yebo-ember-checkouts',

  included: function(app) {
    this._super.included(app);
    app.import('vendor/ember-fsm.js');
    app.import('vendor/register-checkouts.js');
  }
};
