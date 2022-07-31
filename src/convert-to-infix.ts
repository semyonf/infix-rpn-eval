import operations from './operations';
import {OpNode} from './infix/op-node';

// todo make into a const object
export const postfixOperators = Object.freeze({
  '^': operations.get('exponentiation'),
  '*': operations.get('multiplication'),
  '/': operations.get('division'),
  '+': operations.get('addition'),
  '-': operations.get('subtraction'),
});

/**
 * Convert from postfix to infix notation
 * @param {string} postfix tokens must be space separated
 * @returns {string}
 */
function convertToInfix(postfix) {
  const tokens = postfix.split(' ');

  while (tokens.length > 1) {
    for (const i in tokens) {
      const token = tokens[i];

      if (token in postfixOperators) {
        const operation = postfixOperators[token];
        // @ts-expect-error temporary
        const operands = tokens.slice(i - 2, i);

        const opNode = new OpNode(
          operation.operator,
          operation.precedence,
          operation.associativity,
          // @ts-expect-error temporary
          ...operands
        );

        // Tokens contain mixed data types, so
        // @ts-expect-error temporary
        tokens.splice(i - 2, 3, opNode);

        break;
      }
    }
  }

  return tokens[0].getExpression();
}

export default convertToInfix;
