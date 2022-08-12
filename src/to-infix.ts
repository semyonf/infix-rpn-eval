import { Associativity, postfixOperators } from './operators';

class OperationNode {
  constructor(
    private operationSymbol: string,
    private precedence: number,
    private associativity: Associativity,
    private lhs: OperationNode | string,
    private rhs: OperationNode | string,
  ) {}

  getExpression(): string {
    let lhsExpression: string;

    if (this.lhs instanceof OperationNode) {
      lhsExpression = this.lhs.getExpression();

      if (this.precedence > this.lhs.precedence) {
        lhsExpression = `( ${lhsExpression} )`;
      }
    } else {
      lhsExpression = this.lhs;
    }

    let rhsExpression: string;

    if (this.rhs instanceof OperationNode) {
      rhsExpression = this.rhs.getExpression();

      if (
        this.precedence >= this.rhs.precedence &&
        this.associativity !== Associativity.R
      ) {
        rhsExpression = `( ${rhsExpression} )`;
      }
    } else {
      rhsExpression = this.rhs;
    }

    return `${lhsExpression} ${this.operationSymbol} ${rhsExpression}`;
  }
}

export function toInfix(postfix: string): string {
  const tokens: Array<string | OperationNode> = postfix.split(' ');

  while (tokens.length > 1) {
    for (let i = 0; i < tokens.length; i++) {
      const token = tokens[i]!;

      if (token instanceof OperationNode || !(token in postfixOperators)) {
        continue;
      }

      const operation =
        postfixOperators[token as keyof typeof postfixOperators];

      const [lhs, rhs] = tokens.slice(i - 2, i) as [
        string | OperationNode,
        string | OperationNode,
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

  const [first] = tokens;

  if (first instanceof OperationNode) {
    return first.getExpression();
  }

  return first ?? '0';
}
