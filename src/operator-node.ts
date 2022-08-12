import type { Operator } from './types';
import { Associativity } from './types';

export class OperatorNode {
  constructor(
    private operator: Operator,
    private lhsOperand: OperatorNode | string,
    private rhsOperand: OperatorNode | string,
  ) {}

  getExpression(): string {
    let lhsExpression: string;

    if (this.lhsOperand instanceof OperatorNode) {
      lhsExpression = this.lhsOperand.getExpression();

      if (this.operator.precedence > this.lhsOperand.operator.precedence) {
        lhsExpression = `( ${lhsExpression} )`;
      }
    } else {
      lhsExpression = this.lhsOperand;
    }

    let rhsExpression: string;

    if (this.rhsOperand instanceof OperatorNode) {
      rhsExpression = this.rhsOperand.getExpression();

      if (
        this.operator.precedence >= this.rhsOperand.operator.precedence &&
        this.operator.associativity !== Associativity.R
      ) {
        rhsExpression = `( ${rhsExpression} )`;
      }
    } else {
      rhsExpression = this.rhsOperand;
    }

    return `${lhsExpression} ${this.operator.operator} ${rhsExpression}`;
  }
}
