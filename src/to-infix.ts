import { postfixOperators } from './operators';
import { OperatorNode } from './operator-node';

export function toInfix(postfix: string): string {
  const outputStack: Array<OperatorNode | string> = [];

  for (const token of postfix.split(' ')) {
    const operator = postfixOperators[token];

    if (!operator) {
      outputStack.push(token);

      continue;
    }

    // since we only have binary operators
    const [rhsOperand, lhsOperand] = [outputStack.pop(), outputStack.pop()];

    if (rhsOperand === undefined || lhsOperand === undefined) {
      throw new Error('Invalid expression');
    }

    outputStack.push(new OperatorNode(operator, lhsOperand, rhsOperand));
  }

  const stackHead = outputStack.pop();

  if (stackHead instanceof OperatorNode) {
    return stackHead.getExpression();
  }

  return stackHead ?? '0';
}
