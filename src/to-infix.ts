import { Associativity, postfixOperators } from './operators';

class OperatorNode {
  constructor(
    private operator: string,
    private precedence: number,
    private associativity: Associativity,
    private lhsOperand: OperatorNode | string,
    private rhsOperand: OperatorNode | string,
  ) {}

  // todo: refactor this second of all
  getExpression(): string {
    let lhsExpression: string;

    if (this.lhsOperand instanceof OperatorNode) {
      lhsExpression = this.lhsOperand.getExpression();

      if (this.precedence > this.lhsOperand.precedence) {
        lhsExpression = `( ${lhsExpression} )`;
      }
    } else {
      lhsExpression = this.lhsOperand;
    }

    let rhsExpression: string;

    if (this.rhsOperand instanceof OperatorNode) {
      rhsExpression = this.rhsOperand.getExpression();

      if (
        this.precedence >= this.rhsOperand.precedence &&
        this.associativity !== Associativity.R
      ) {
        rhsExpression = `( ${rhsExpression} )`;
      }
    } else {
      rhsExpression = this.rhsOperand;
    }

    return `${lhsExpression} ${this.operator} ${rhsExpression}`;
  }
}

export function toInfix(postfix: string): string {
  const outputStack: Array<OperatorNode | string> = [];

  for (const token of postfix.split(' ')) {
    if (!(token in postfixOperators)) {
      outputStack.push(token);

      continue;
    }

    // since we only have binary operators
    const [rhsOperand, lhsOperand] = [outputStack.pop(), outputStack.pop()];

    if (rhsOperand === undefined || lhsOperand === undefined) {
      throw new Error('Invalid expression');
    }

    const operation = postfixOperators[token as keyof typeof postfixOperators];

    outputStack.push(
      new OperatorNode(
        operation.operator,
        operation.precedence,
        operation.associativity,
        lhsOperand,
        rhsOperand,
      ),
    );
  }

  const stackHead = outputStack.pop();

  if (stackHead instanceof OperatorNode) {
    return stackHead.getExpression();
  }

  return stackHead ?? '0';
}
