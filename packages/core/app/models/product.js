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
  // rawPrice: DS.attr('number'),
  costPrice: DS.attr('string'),
  // rawCostPrice: DS.attr('number'),
  discountPrice: DS.attr('string'),
  // rawDiscountPrice: DS.attr('number'),

  // Installments Attributes
  hasInstallments: DS.attr("boolean"),
  installments: DS.attr("string"),
  installmentValue: DS.attr('string'),
  // rawInstallmentValue: DS.attr('number'),

  // Relationships
  images: DS.hasMany('image'),
  variantsIncludingMaster: DS.hasMany('variant'),
  productProperties: DS.hasMany('productProperty'),
  taxons: DS.hasMany('taxon'),

  //Computed
  variants: Ember.computed('variantsIncludingMaster', function() {
    return this.get('variantsIncludingMaster').rejectBy('isMaster');
  }),

  master: Ember.computed('variantsIncludingMaster', function() {
    return this.get('variantsIncludingMaster').findBy('isMaster');
  }),

  image: Ember.computed('images', function() {
    let imgs = this.get('images');
    return imgs.findBy('position', 1) || imgs.findBy('position', 0);
  }),
});
