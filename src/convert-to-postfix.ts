import Assoc from './associativity';
import operations from './operations';
import {postfixOperators} from './convert-to-infix';

const infixOperators = Object.freeze({
  ...postfixOperators,
  '(': operations.get('bracket'),
});

function convertToPostfix(infix: string): string {
  const tokens = infix.split(' ');
  const outputStack = [];
  const operatorStack = [];

  /**
   * todo: should throw exceptions on missing or excessive brackets
   */
  for (const token of tokens) {
    if (token in infixOperators) {
      const op1 = infixOperators[token];

      while (operatorStack.length) {
        const op2 = operatorStack[operatorStack.length - 1];

        if (
          (op1.associativity === Assoc.left &&
            // @ts-expect-error temporary
            op1.precedence <= op2.precedence)
          ||
          (op1.associativity === Assoc.right &&
            // @ts-expect-error temporary
            op1.precedence < op2.precedence)
        ) {
          operatorStack.pop();
          // @ts-expect-error temporary
          outputStack.push(op2.operator);
        } else {
          break;
        }
      }

      // @ts-expect-error temporary
      operatorStack.push(op1);
    } else {
      if (token === ')') {
        // @ts-expect-error temporary
        while (!operatorStack[operatorStack.length - 1].isBracket) {
          // @ts-expect-error temporary
          outputStack.push(operatorStack.pop().operator);
        }
        operatorStack.pop();
      } else {
        // @ts-expect-error temporary
        outputStack.push(token);
      }
    }
  }

  const res = outputStack
    .concat(
      // @ts-expect-error temporary
      operatorStack
        .reverse()
          // @ts-expect-error temporary
        .map(x => x.operator)
    );

  return res.join(' ');
}

export default convertToPostfix;
