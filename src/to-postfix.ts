import { Associativity, infixOperators, Operator } from './operators';

// todo: refactor
export function toPostfix(infix: string): string {
  const tokens = infix.split(' ');
  const outputStack: string[] = [];
  const operatorStack: Operator[] = [];

  /**
   * todo: should throw exceptions on missing or excessive brackets
   */
  for (const token of tokens) {
    if (token in infixOperators) {
      const op1 = infixOperators[token as keyof typeof infixOperators];

      while (operatorStack.length) {
        const op2 = operatorStack[operatorStack.length - 1];

        if ('isBracket' in op2 || 'isBracket' in op1) {
          break;
        }

        if (
          (op1.associativity === Associativity.Left &&
            op1.precedence <= op2.precedence) ||
          (op1.associativity === Associativity.Right &&
            op1.precedence < op2.precedence)
        ) {
          operatorStack.pop();
          outputStack.push(op2.operator);
        } else {
          break;
        }
      }

      operatorStack.push(op1);

      continue;
    }

    if (token === ')') {
      while (!('isBracket' in operatorStack[operatorStack.length - 1])) {
        outputStack.push(
          // fixme
          (operatorStack.pop() as unknown as Record<string, string>).operator,
        );
      }

      operatorStack.pop();

      continue;
    }

    outputStack.push(token);
  }

  return outputStack
    .concat(
      operatorStack.reverse().map(
        (operator) =>
          // fixme
          (operator as unknown as Record<string, string>).operator,
      ),
    )
    .join(' ');
}
