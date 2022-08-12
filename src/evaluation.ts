import { toPostfix } from './to-postfix';
import { postfixOperators } from './operators';

const mathConstants = {
  pi: Math.PI,
  tau: Math.PI * 2,
  e: Math.E,
} as const;

export function evaluatePostfix(postfix: string): number {
  const tokens = postfix.split(' ').map((token) => token.toLowerCase());
  const stack: number[] = [];

  for (const token of tokens) {
    if (!Object.keys(postfixOperators).includes(token)) {
      stack.push(
        mathConstants[token as keyof typeof mathConstants] ?? parseFloat(token),
      );

      continue;
    }

    const operands = stack.splice(-2, 2);
    stack.push(
      operands.reduce((prev, curr) => {
        switch (token) {
          case '+':
            return prev + curr;
          case '-':
            return prev - curr;
          case '*':
            return prev * curr;
          case '/':
            return prev / curr;
          case '^':
            return Math.pow(prev, curr);
          default:
            throw new Error('Oopsie');
        }
      }),
    );
  }

  return stack.pop() ?? Number.NaN;
}

export function evaluateInfix(infix: string): number {
  return evaluatePostfix(toPostfix(infix));
}
