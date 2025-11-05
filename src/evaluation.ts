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

function validateMathConstants(constants: false | Record<string, number>): void {
  if (constants && Object.keys(constants).some((key) => !isNaN(parseInt(key)))) {
    throw new Error('Constants cannot be numbers!');
  }
}

function processOperand(
  token: string,
  stack: number[],
  mathConstants: false | Record<string, number>
): void {
  if (mathConstants) {
    const mathConstant = mathConstants[token];
    if (mathConstant !== undefined) {
      stack.push(mathConstant);
      return;
    }
  }

  stack.push(parseFloat(token));
}

function processOperator(token: string, stack: number[]): void {
  const operator = postfixOperators[token];
  if (!operator?.operation) {
    throw new Error(`Unknown or invalid operator: ${token}`);
  }

  const operands = stack.splice(-2, 2);
  if (operands.length !== 2 || operands[0] === undefined || operands[1] === undefined) {
    throw new Error('Insufficient operands for operator');
  }

  stack.push(operator.operation(operands[0], operands[1]));
}

export function evaluatePostfix(
  postfix: string,
  { evaluateMathConstants }: EvaluationParams = {
    evaluateMathConstants: defaultMathConstants,
  },
): number {
  validateMathConstants(evaluateMathConstants);

  const tokens = postfix.split(' ').map((token) => token.toLowerCase());
  const stack: number[] = [];

  for (const token of tokens) {
    if (token in postfixOperators) {
      processOperator(token, stack);
    } else {
      processOperand(token, stack, evaluateMathConstants);
    }
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
