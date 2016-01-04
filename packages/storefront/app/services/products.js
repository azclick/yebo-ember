import Ember from 'ember';

/**
 * Service used to list the products from the store.
 */
export default Ember.Service.extend(Ember.Evented, {
  /**
   * Yebo main service reference
   */
  yebo: Ember.inject.service('yebo'),

  /**
   * Current Query
   */
  currentQuery: null,

  /**
   * This methods returns an promise that resolves an array of products
   * that are the result of an query executed in the Yebo API.
   *
   * @method
   * @public
   * @param {YeboSDK.Products} query An instance of the YeboSDK.Products or the
   * options that will be used to create a new instance of this class
   * @return {Promise} The result of the query
   */
  search(query) {
    // Check if the query is the YeboSDK Object
    if( query === undefined )
      query = new YeboSDK.Products();

    // Set it to the currentQuery
    // this.set('currentQuery', query);

    // Return a Promise
    return new Ember.RSVP.Promise((resolve, reject) => {
      // Execute the query
      query.execute().then((res) => {
        // Yebo Store
        let store = this.get('yebo').store;

        // The Query result
        let result = [];

        // Push the records to the ember
        store.pushPayload(res);

        // Return the result of the search
        for( let i = 0; i < res.products.length; i++ ) {
          // Current product
          let product = res.products[i];

          // Push it to the results
          result.push(store.peekRecord('product', product.id));
        }

        // Resolve with the result
        resolve(result);
      }).catch((error) => {
        // Error!
        reject(error);
      });
    });
  },

  /**
   * This method return the possible filters that can applied to the
   * products that match the query passed.
   *
   * @method
   * @public
   * @param {YeboSDK.Products} query An instance of the YeboSDK.Products or the
   * options that will be used to create a new instance of this class
   * @return {Promise} The result with the aggregations
   */
  aggs(query) {
  }
});
