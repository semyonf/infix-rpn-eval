'use strict';

const evaluatePostfix = require('./evaluate_postfix');
const toPostfix = require('./convert_to_postfix');

/**
 * Evaluate infix expression
 * @param {string} infix tokens must be space separated
 * @returns {number}
 */
module.exports = function (infix) {
  return evaluatePostfix(toPostfix(infix));
};
