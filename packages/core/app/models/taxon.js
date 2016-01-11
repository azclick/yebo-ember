import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  prettyName: DS.attr('string'),
  permalink: DS.attr('string'),
  parentId: DS.attr('number'),
  taxonomy: DS.belongsTo('taxonomy'),
  description: DS.attr('string'),
  iconUrl: DS.attr('string'),
  iconNormalUrl: DS.attr('string'),
  iconMiniUrl: DS.attr('string'),

  // Breadcrumbs
  breadcrumbs: DS.attr(),

  children: DS.hasMany('taxon'),

  childrenExcMaster: Ember.computed('children', function() {
    return this.get('children').findBy('parentId', undefined);
  }),
});
