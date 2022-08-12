import { Associativity, infixOperators, Operator } from './operators';

export function toPostfix(infix: string): string {
  const tokens = infix.split(' ');
  const outputStack: string[] = [];
  const operatorStack: Operator[] = [];

  /**
   * todo: should throw exceptions on missing or excessive brackets
   */
  for (const token of tokens) {
    if (token === ')') {
      let lastOperator = operatorStack.pop();

      while (lastOperator && lastOperator.operator !== '(') {
        outputStack.push(lastOperator.operator);
        lastOperator = operatorStack.pop();
      }

      continue;
    }

    if (!(token in infixOperators)) {
      outputStack.push(token);

      continue;
    }

    const operator = infixOperators[token as keyof typeof infixOperators]!;
    let lastOperator = operatorStack[operatorStack.length - 1];

    while (lastOperator) {
      lastOperator = operatorStack[operatorStack.length - 1];

      if (
        !lastOperator ||
        lastOperator.operator === '(' ||
        operator.operator === '('
      ) {
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

  return outputStack
    .concat(operatorStack.reverse().map((operator) => operator.operator))
    .join(' ');
}
