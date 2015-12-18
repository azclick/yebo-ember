// Dependencies
import Ember from 'ember';
import layout from '../templates/components/yebo-search';

/**
  The search form

  @class YeboDetails
  @namespace Component
  @extends Ember.Component
*/
export default Ember.Component.extend({
  layout: layout,

  // The text that is going to be searched
  searchText: '',

  actions: {
    /**
     * Transition to the /products route with param search
     */
    search: function() {
      // Search Text
      let searchText = this.get('searchText');

      // Check if the searchText is higher than 2
      // @todo Show some kind of error
      if( searchText.length < 3 )
        return;

      // Transition to the products page
      // this.transitionTo('products', { queryParams: { search: searchText } });
    }
  }
});
