/**
 * Convert from infix to postfix notation
 * @param infix {string} tokens must be space separated
 * @returns {string}
 */
module.exports = function (infix) {
  const Assoc = require('./Associativity');
  const operations = require('./Operations');

  // Uncomment in case of possible operations extension
  // operations.set = operations.clear = operations.delete = () => {
  //   throw new Error('Map is frozen!');
  // };

  /**
   * todo: implement nested brackets e.g. ( a + b * ( c - d) - e) + f
   */
  const operators = Object.freeze({
    '^': operations.get('exponentiation'),
    '*': operations.get('multiplication'),
    '/': operations.get('division'),
    '+': operations.get('addition'),
    '-': operations.get('subtraction'),
    '(': operations.get('bracket'),
  });

  const tokens = infix.split(' ');
  const outputStack = [];
  const operatorStack = [];

  for (const token of tokens) {
    if (token in operators) {
      const op1 = operators[token];

      while (operatorStack.length) {
        const op2 = operatorStack[operatorStack.length - 1];

        if (
          (op1.associativity === Assoc.left &&
            op1.precedence <= op2.precedence)
          ||
          (op1.associativity === Assoc.right &&
            op1.precedence < op2.precedence)
        ) {
          operatorStack.pop();
          outputStack.push(op2.operator);
        } else {
          break;
        }
      }

      operatorStack.push(op1);
    } else {
      if (token === ')') {
        while (!operatorStack[operatorStack.length - 1].isBracket) {
          outputStack.push(operatorStack.pop().operator);
        }
        operatorStack.pop();
      } else {
        outputStack.push(token);
      }
    }
  }

  const res = outputStack
    .concat(
      operatorStack
        .reverse()
        .map(x => x.operator)
    );

  return res.join(' ');
};
