import { Associativity, postfixOperators } from './operators';

class OperationNode {
  constructor(
    private operator: string,
    private precedence: number,
    private associativity: Associativity,
    private lhs: OperationNode | number,
    private rhs: OperationNode | number,
  ) {}

  getExpression(): string {
    let lhsExpression, rhsExpression;

    if (this.lhs instanceof OperationNode) {
      lhsExpression = this.lhs.getExpression();

      if (this.precedence > this.lhs.precedence) {
        lhsExpression = `( ${lhsExpression} )`;
      }
    } else {
      lhsExpression = this.lhs;
    }

    if (this.rhs instanceof OperationNode) {
      rhsExpression = this.rhs.getExpression();

      if (
        this.precedence >= this.rhs.precedence &&
        this.associativity !== Associativity.right
      ) {
        rhsExpression = `( ${rhsExpression} )`;
      }
    } else {
      rhsExpression = this.rhs;
    }

    return `${lhsExpression} ${this.operator} ${rhsExpression}`;
  }
}

// todo clean this up
export function toInfix(postfix: string): string {
  const tokens: Array<string | OperationNode> = postfix.split(' ');

  while (tokens.length > 1) {
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i];

      if (token instanceof OperationNode) {
        continue;
      }

      if (token in postfixOperators) {
        const operation = postfixOperators[token];

        const [lhs, rhs] = tokens.slice(i - 2, i) as [
          number | OperationNode,
          number | OperationNode,
        ];

        const operationNode = new OperationNode(
          operation.operator,
          operation.precedence,
          operation.associativity,
          lhs,
          rhs,
        );

        tokens.splice(i - 2, 3, operationNode);

        break;
      }
    }
  }

  return (tokens[0] as OperationNode).getExpression();
}
