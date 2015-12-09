// Ember!
import Ember from 'ember';

/**
 * Radio Component
 *
 * @usage
 *   {{yebo-radio value=something.id checked=someProperty}}
 *   {{yebo-radio value=another.id checked=someProperty}}
 */
export default Ember.Component.extend({
  tagName: 'input',
  type: 'radio',
  attributeBindings: ['type', 'htmlChecked:checked', 'value', 'name', 'disabled'],

  htmlChecked: function() {
    return this.get('value') === this.get('checked');
  }.property('value', 'checked'),

  change: function() {
    this.set('checked', this.get('value'));
    this.sendAction('action', this.get('value'));
  },

  _updateElementValue: function() {
    Ember.run.next(this, function() {
      this.$().prop('checked', this.get('htmlChecked'));
    });
  }.observes('htmlChecked')
});
