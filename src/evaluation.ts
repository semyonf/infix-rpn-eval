import { toPostfix } from './to-postfix';
import { postfixOperators } from './operators';

interface EvaluationParams {
  evaluateMathConstants: false | Record<string, number>;
}

const defaultMathConstants = {
  pi: Math.PI,
  tau: Math.PI * 2,
  e: Math.E,
};

// todo: refactor
export function evaluatePostfix(
  postfix: string,
  { evaluateMathConstants }: EvaluationParams = {
    evaluateMathConstants: defaultMathConstants,
  },
): number {
  if (
    Object.keys(evaluateMathConstants)?.some((key) => !isNaN(parseInt(key)))
  ) {
    throw new Error('Constants cannot be numbers!');
  }

  const tokens = postfix.split(' ').map((token) => token.toLowerCase());
  const stack: number[] = [];

  for (const token of tokens) {
    if (!Object.keys(postfixOperators).includes(token)) {
      if (evaluateMathConstants) {
        const mathConstant = evaluateMathConstants[token];

        if (mathConstant !== undefined) {
          stack.push(mathConstant);

          continue;
        }
      }

      stack.push(parseFloat(token));

      continue;
    }

    // todo: refactor
    stack.push(
      stack.splice(-2, 2).reduce((lhs, rhs) => {
        switch (token) {
          case '+':
            return lhs + rhs;
          case '-':
            return lhs - rhs;
          case '*':
            return lhs * rhs;
          case '/':
            return lhs / rhs;
          case '^':
            return Math.pow(lhs, rhs);
          default:
            throw new Error('Oopsie');
        }
      }),
    );
  }

  return stack.pop() ?? Number.NaN;
}

export function evaluateInfix(
  infix: string,
  evaluationParams: EvaluationParams = {
    evaluateMathConstants: defaultMathConstants,
  },
): number {
  return evaluatePostfix(toPostfix(infix), evaluationParams);
}
