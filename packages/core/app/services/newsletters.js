import Ember from 'ember';

/**
 * Service used manage the newsletter subscriptions
 */
export default Ember.Service.extend(Ember.Evented, {
  /**
   * Yebo main service reference
   */
  yebo: Ember.inject.service('yebo'),

  /**
   * This method is responsible to subscribe a new user
   *
   * @method
   * @public
   * @param {String} email The user email
   * @param {Object} info Additional information about the user. ej full_name, gender
   * @return {Promise} That resolve the subscribed user
   */
  subscribe(email, info) {
    // Request options
    let options = {};

    // Merge the info into the options
    for( let infoKey in info )
      options[infoKey] = info[infoKey];

    // Add the email to the options
    options.email = email;

    // Return a Promise
    return new Ember.RSVP.Promise((resolve, reject) => {
      // Use the SDK to make the subscription
      YeboSDK.Store.fetch('newsletters/subscribe', options, 'POST').then((res) => {
        // Success, return it to the promise
        resolve(res);
      }).catch((err) => {
        // Error!
        reject(err);
      });
    });
  },

  /**
   * Remove the passed email from the newsletter list
   *
   * @method
   * @public
   * @param {String} email The user email
   * @return {Promise} Resolve if the user was removed from the newsletter list
   */
  unsubscribe(email) {
    // Return a Promise
    return new Ember.RSVP.Promise((resolve, reject) => {
      // Use the SDK to make the subscription
      YeboSDK.Store.fetch('newsletters/unsubscribe', { email: email }, 'POST').then((res) => {
        // Success, return it to the promise
        resolve(res);
      }).catch((err) => {
        // Error!
        reject(err);
      });
    });
  }
});
