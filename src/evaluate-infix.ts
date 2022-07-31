import convertToPostfix from './convert-to-postfix';
import evaluatePostfix from './evaluate-postfix';

/**
 * Evaluate infix expression
 * @param {string} infix tokens must be space separated
 * @returns {number}
 */
export default function (infix) {
  return evaluatePostfix(convertToPostfix(infix));
}
