// Ember!
import Ember from 'ember';

/**
 * Filter Select
 *
 * @usage
 *   {{yebo-filter-select value=something.id selection=someProperty filterName='cor'}}
 */
export default Ember.Component.extend({
  tagName: 'input',
  type: 'checkbox',
  attributeBindings: ['type', 'htmlChecked:checked', 'value', 'name', 'disabled'],

  /**
   *
   */
  htmlChecked: function() {
    return false;
    // return this._selectionValue().indexOf(this.get('value')) > 0;
  }.property('value', 'selection'),

  /**
   *
   */
  change: function() {
    // Element
    let el = this.$();

    // Selected items
    let selectedItems = this._selectionValue();

    // If the element is selected add to the selected items
    if( el.is(':checked') )
      selectedItems.pushObject(this.get('value'));
    else
      selectedItems.removeObject(this.get('value'));

    // Send action
    this.sendAction('action', this.get('value'));
  },

  /**
   * @todo Make it work
   */
  _updateElementValue: function() {
    // Ember.run.next(this, function() {
    //   this.$().prop('checked', this.get('htmlChecked'));
    // });
  }.observes('htmlChecked'),

  /**
   * Provide the real value for the filter
   */
  _selectionValue: function() {
    // Define the container if it not exists
    if( this.get('selection') === undefined )
      this.set('selection', {});

    // Set the container
    let container = this.get('selection');

    // Define the filter name
    if( container[this.get('filterName')] === undefined )
      container[this.get('filterName')] = [];

    // Return the real value for the filter
    return container[this.get('filterName')];
  }
});
