/**
 * @type {Map}
 */
const constants = require('./constants');

/**
 * Evaluate postfix expression
 * @param postfix {string} tokens must be space separated
 * @returns {number}
 */
module.exports = function (postfix) {
  const tokens = postfix.split(' ');
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
