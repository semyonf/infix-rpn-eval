import { infixOperators } from './operators';
import type { Operator } from './types';
import { Associativity } from './types';

function processClosingBracket(
  operatorStack: Operator[],
  outputStack: string[]
): void {
  let foundMatchingBracket = false;

  while (operatorStack.length) {
    const operator = (operatorStack.pop() as Operator).operator;

    if (operator === '(') {
      foundMatchingBracket = true;
      return;
    }

    outputStack.push(operator);
  }

  if (!foundMatchingBracket) {
    throw new Error('Mismatched brackets: closing bracket without matching opening bracket');
  }
}

function shouldPopOperator(
  currentOperator: Operator,
  lastOperator: Operator
): boolean {
  if (!lastOperator?.associativity || !currentOperator.associativity) {
    return false;
  }

  return (
    (currentOperator.associativity === Associativity.L &&
      currentOperator.precedence <= lastOperator.precedence) ||
    (currentOperator.associativity === Associativity.R &&
      currentOperator.precedence < lastOperator.precedence)
  );
}

function processOperatorToken(
  operator: Operator,
  operatorStack: Operator[],
  outputStack: string[]
): void {
  while (operatorStack.length) {
    const lastOperator = operatorStack[operatorStack.length - 1];

    if (lastOperator && shouldPopOperator(operator, lastOperator)) {
      operatorStack.pop();
      outputStack.push(lastOperator.operator);
    } else {
      break;
    }
  }

  operatorStack.push(operator);
}

function validateBrackets(operatorStack: Operator[]): void {
  const unclosedBrackets = operatorStack.filter((op) => op.operator === '(');
  if (unclosedBrackets.length > 0) {
    throw new Error('Mismatched brackets: unclosed opening bracket(s)');
  }
}

export function toPostfix(infix: string): string {
  const tokens = infix.split(' ');
  const outputStack: string[] = [];
  const operatorStack: Operator[] = [];

  function processToken(token: string) {
    if (!(token in infixOperators)) {
      outputStack.push(token);
      return;
    }

    if (token === ')') {
      processClosingBracket(operatorStack, outputStack);
      return;
    }

    const operator = infixOperators[token];

    if (!operator) {
      throw new Error('Unknown operator');
    }

    processOperatorToken(operator, operatorStack, outputStack);
  }

  tokens.forEach(processToken);

  validateBrackets(operatorStack);

  return outputStack
    .concat(operatorStack.reverse().map((node) => node.operator))
    .join(' ');
}
