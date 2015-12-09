//
import Ember from 'ember';

/**
 * Generate an array with the specific range
 * This is used to pass to the #each block
 *
 * @param {Integer}(Required) start - The initial value for the range
 * @param {Integer}(Optional) end - The end of the range
 * @param {Integer}(Optional) next - A value that will be added to the `start` and will be setted as the end of the range
 *
 * @usage
 *   <select name="month">
 *     {{#each (range start=1 end=12) as |item|}}
 *       <option value={{item}}>{{item}}</option>
 *     {{/each}}
 *   </select>
 */
export default Ember.Helper.helper(function(params, { start, end, next }) {
  // Check if the range start exists
  if( start === undefined ) {
    console.warn('Range start must be defined.');
    return [];
  }

  // Check the end of the range
  if( end === undefined && next === undefined ) {
    console.warn('Range end must be defined with `end` or `next` options.');
    return [];
  }

  // Method variables
  let rangeEnd,
      result = [];

  // Define the end
  if( end === undefined )
    rangeEnd = start + next;
  else
    rangeEnd = end;

  // Set it
  for( let i = start; i <= rangeEnd; i++ )
    result.push(i);

  // Return the range array
  return result;
});
