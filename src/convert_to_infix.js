// todo: remove from Stryker's ignored files
/**
 * Convert from postfix to infix notation
 * @param postfix {string} tokens must be space separated
 * @returns {string}
 */
module.exports = function (postfix) {
  const tokens = postfix.split(' ');

  const operators = ['+', '-', '/', '*', '^', ':'];

  const operandStack = [];
  const operatorStack = [];
  const outputStack = [];

  const expressionBuilder = function (lhs, rhs, operator) {

  };

  for (const token of tokens) {
    if (!operators.includes(token)) {
      operandStack.push(token);
    } else {
      operatorStack.push(token);
      expressionBuilder(...operandStack, token);
    }
  }
};
