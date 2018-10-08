/**
 * @type {Map}
 */
const constants = require('./constants');

/**
 * Evaluate postfix expression
 * @param {string} postfix tokens must be space separated
 * @returns {number}
 */
module.exports = function (postfix) {
  let nums = postfix.split(new RegExp('[\\'+Object.keys(operators).join('\\')+']')),
      ops = postfix.split(/[0-9]+/),
      tmpTokens = [];
  for(let i = 0; i < nums.length; i++)
    tmpTokens.push(nums[i], ops[i+1])

  const tokens = tmpTokens.slice(0, tmpTokens.length-1)
  const stack = [];

  for (let token of tokens) {
    if (!['+', '-', '/', '*', '^'].includes(token)) {

      token = token.toLowerCase();

      if (constants.has(token)) {
        token = constants.get(token);
      }

      stack.push(parseFloat(token));
    } else {
      const operands = stack.splice(-2, 2);
      stack.push(operands.reduce((prev, curr) => {
        switch (token) {
        case '+':
          return prev + curr;
        case '-':
          return prev - curr;
        case '*':
          return prev * curr;
        case '/':
          return prev / curr;
        case '^':
          return Math.pow(prev, curr);
        }
      }));
    }
  }

  return stack.pop();
};
