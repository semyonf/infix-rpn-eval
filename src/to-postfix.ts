import { infixOperators } from './operators';
import type { Operator } from './types';
import { Associativity } from './types';

// todo: refactor this when everything else looks good
export function toPostfix(infix: string): string {
  const tokens = infix.split(' ');
  const outputStack: string[] = [];
  const operatorStack: Operator[] = [];

  function processToken(token: string) {
    if (!(token in infixOperators)) {
      outputStack.push(token);

      return;
    }

    // todo: should throw exceptions on missing or excessive brackets
    if (token === ')') {
      while (operatorStack.length) {
        const operator = (operatorStack.pop() as Operator).operator;

        if (operator === '(') {
          return;
        }

        outputStack.push(operator);
      }
    }

    const operator = infixOperators[token];

    if (!operator) {
      throw new Error('Unknown operator');
    }

    while (operatorStack.length) {
      const lastOperator = operatorStack[operatorStack.length - 1];

      if (!lastOperator?.associativity || !operator.associativity) {
        break;
      }

      if (
        (operator.associativity === Associativity.L &&
          operator.precedence <= lastOperator.precedence) ||
        (operator.associativity === Associativity.R &&
          operator.precedence < lastOperator.precedence)
      ) {
        operatorStack.pop();
        outputStack.push(lastOperator.operator);
      } else {
        break;
      }
    }

    operatorStack.push(operator);
  }

  tokens.forEach(processToken);

  return outputStack
    .concat(operatorStack.reverse().map((node) => node.operator))
    .join(' ');
}
