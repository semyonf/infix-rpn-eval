'use strict';

const Assoc = require('./Associativity');
const operations = require('./operations');

const operators = Object.freeze({
  '^': operations.get('exponentiation'),
  '*': operations.get('multiplication'),
  '/': operations.get('division'),
  '+': operations.get('addition'),
  '-': operations.get('subtraction'),
  '(': operations.get('bracket'),
});

/**
 * Convert from infix to postfix notation
 * @param {string} infix tokens must be space separated
 * @returns {string}
 */
function convertToPostfix(infix) {
  const tokens = infix.split(' ');
  const outputStack = [];
  const operatorStack = [];

  /**
   * todo: should throw exceptions on missing or excessive brackets
   */
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
}

module.exports = convertToPostfix;
