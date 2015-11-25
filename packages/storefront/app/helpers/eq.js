import Ember from 'ember';

export default Ember.Helper.helper(function(params, hash) {
  let firstParam = params[0];
  let secondParam = params[1];

  return firstParam === secondParam;
});
