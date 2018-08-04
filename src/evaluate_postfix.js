/**
 * Evaluate postfix expression
 * @param postfix tokens must be space separated
 * @returns {number}
 */
module.exports = function (postfix) {
  const tokens = postfix.split(' ');
  const stack = [];

  for (const token of tokens) {
    if (!['+', '-', '/', '*', '^', ':'].includes(token)) {
      stack.push(parseFloat(token));
    } else {
      const operands = [stack.pop(), stack.pop()].reverse();
      stack.push(operands.reduce((prev, curr) => {
        switch (token) {
          case '+':
            return prev + curr;
          case '-':
            return prev - curr;
          case '*':
            return prev * curr;
          case '/':
          case ':':
            return prev / curr;
          case '^':
            return Math.pow(prev, curr);
        }
      }));
    }
  }

  return stack.pop();
};
