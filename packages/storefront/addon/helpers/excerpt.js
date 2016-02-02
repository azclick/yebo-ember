//
import Ember from 'ember';

/**
 * Make a substring of given string
 *
 * @param {String}(Required)  The initial value for the range
 * @param {Integer}(Required) Quantity of caracteres of short version
 * @param {String}(Options) Append to the end of string
 *
 * @usage
 * {{excerpt "long string" 4}}
 */

export default Ember.Helper.helper(function(params, hash) {
  let string = params[0];
  let size = params[1];
  let appendToEnd = params[2] || " ... ";

  if (string.length > size) {
    var theString = string.substring(0, size) + appendToEnd;
    return new Ember.Handlebars.SafeString(theString);
  } else {
    return string;
  }
});
