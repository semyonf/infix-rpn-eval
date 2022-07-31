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

        if (
          // @ts-expect-error temporary
          (op1.associativity === Associativity.left &&
            op1.precedence <= op2.precedence) ||
          // @ts-expect-error temporary
          (op1.associativity === Associativity.right &&
            op1.precedence < op2.precedence)
        ) {
          operatorStack.pop();
          // @ts-expect-error temporary
          outputStack.push(op2.operator);
        } else {
          break;
        }
      }

      operatorStack.push(op1);
    } else if (token === ')') {
      // @ts-expect-error temporary
      while (!operatorStack[operatorStack.length - 1].isBracket) {
        // @ts-expect-error temporary
        outputStack.push(operatorStack.pop().operator);
      }
      operatorStack.pop();
    } else {
      outputStack.push(token);
    }
  }

  return (
    outputStack
      // @ts-expect-error temporary
      .concat(operatorStack.reverse().map((operator) => operator.operator))
      .join(' ')
  );
}
