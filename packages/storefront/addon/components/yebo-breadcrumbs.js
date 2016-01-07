import Ember from 'ember';
import layout from '../templates/components/yebo-breadcrumbs';

/**
 * Breadcrumbs
 */
export default Ember.Component.extend({
  layout: layout,

  // Breadcrumbs items
  items: Ember.computed('breadcrumbs', function() {
    // Get the breadcrumbs
    let breadcrumbs = this.get('breadcrumbs');

    // Set the last item
    this.set('lastItem', breadcrumbs[breadcrumbs.length - 1]);

    // Remove the last item
    breadcrumbs.pop();

    // Return the breadcrumbs
    return breadcrumbs;
  }),
});
