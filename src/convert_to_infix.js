/**
 * Convert from postfix to infix notation
 * @param postfix {string} tokens must be space separated
 * @returns {string}
 */
module.exports = function (postfix) {
  const Assoc = require('./Associativity');
  const operations = require('./operations');
  const operators = Object.freeze({
    '^': operations.get('exponentiation'),
    '*': operations.get('multiplication'),
    '/': operations.get('division'),
    '+': operations.get('addition'),
    '-': operations.get('subtraction'),
  });

  class OpNode {
    constructor(operator, precedence, associativity, lhs, rhs) {
      this.operator = operator;
      this.precedence = precedence;
      this.associativity = associativity;
      this.lhs = lhs;
      this.rhs = rhs;
    }

    getExpression() {
      let lhsExpression, rhsExpression;

      if (this.lhs instanceof OpNode) {
        lhsExpression = this.lhs.getExpression();

        if (this.precedence > this.lhs.precedence) {
          lhsExpression = `( ${lhsExpression} )`;
        }
      } else {
        lhsExpression = this.lhs;
      }

      if (this.rhs instanceof OpNode) {
        rhsExpression = this.rhs.getExpression();

        if (
          this.precedence >= this.rhs.precedence
          &&
          this.associativity !== Assoc.right
        ) {
          rhsExpression = `( ${rhsExpression} )`;
        }
      } else {
        rhsExpression = this.rhs;
      }

      return `${lhsExpression} ${this.operator} ${rhsExpression}`;
    }
  }

  const tokens = postfix.split(' ');

  while (tokens.length > 1) {
    for (const i in tokens) {
      const token = tokens[i];

      if (token in operators) {
        const operation = operators[token];
        const operands = tokens.slice(i - 2, i);

        const opNode = new OpNode(
          operation.operator,
          operation.precedence,
          operation.associativity,
          ...operands
        );

        // Tokens contain mixed data types, so -
        // noinspection JSCheckFunctionSignatures
        tokens.splice(i - 2, 3, opNode);

        break;
      }
    }
  }

  return tokens[0].getExpression();
};
