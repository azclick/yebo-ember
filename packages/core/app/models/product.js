import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({

  // Attributes
  name: DS.attr('string'),
  description: DS.attr('string'),
  slug: DS.attr('string'),
  total_on_hand: DS.attr('number'),
  available: DS.attr('boolean'),

  // Price Attributes
  price: DS.attr('string'),
  rawPrice: DS.attr('number'),
  costPrice: DS.attr('string'),
  rawCostPrice: DS.attr('number'),
  discountPrice: DS.attr('string'),
  rawDiscountPrice: DS.attr('number'),


  // Installments Attributes
  installments: DS.attr('number'),
  installmentValue: DS.attr('string'),
  rawInstallmentValue: DS.attr('number'),

  // Relationships
  images: DS.hasMany('image'),
  variantsIncludingMaster: DS.hasMany('variant'),
  productProperties: DS.hasMany('productProperty'),
  taxons: DS.hasMany('taxon'),

  //Computed
  variants: Ember.computed('variantsIncludingMaster', function() {
    return this.get('variantsIncludingMaster');
  }),

  master: Ember.computed('variantsIncludingMaster', function() {
    return this.get('variantsIncludingMaster').findBy('isMaster');
  }),

  image: Ember.computed('images.[]', function() {
    return this.get('images').findBy('position');
  }),

  masterBrand: Ember.computed('taxons.[]', function() {
    // var brandTaxonomyPermalink = "marcas";
    // var brandTaxonomy = this.store
    //   .findQuery('taxon', { q: { permalink_eq: brandTaxonomyPermalink } });
    //
    // return this.get('taxons').findBy('parentId', brandTaxonomy
    //   .findBy('permalink', 'marcas')
    //   .get("id"));

    var brandTaxonomy = Ember.Object.create({ id: 2 });
    return this.get('taxons').findBy('parentId', brandTaxonomy.get("id"));
  })
});
