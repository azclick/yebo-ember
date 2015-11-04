/* jshint node: true */
'use strict';

module.exports = {
  name: 'yebo-ember-auth',

  isDevelopingAddon: function() {
    return true;
  },

  included: function(app) {
    this._super.included(app);

    /* Here we call included on any nested Yebo Ember Dependencies */
    this.addons.forEach(function(addon){
      if (addon.name.substring(0, 11)  === "yebo-ember") {
        addon.included.apply(addon, [app]);
      }
    });

    app.import('vendor/register-auth.js');
  }
};
