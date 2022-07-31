import Assoc from '../associativity';

export class OpNode {
  constructor(operator, precedence, associativity, lhs, rhs) {
    // @ts-expect-error temporary
    this.operator = operator;
    // @ts-expect-error temporary
    this.precedence = precedence;
    // @ts-expect-error temporary
    this.associativity = associativity;
    // @ts-expect-error temporary
    this.lhs = lhs;
    // @ts-expect-error temporary
    this.rhs = rhs;
  }

  getExpression(): string {
    let lhsExpression, rhsExpression;

    // @ts-expect-error temporary
    if (this.lhs instanceof OpNode) {
      // @ts-expect-error temporary
      lhsExpression = this.lhs.getExpression();

      // @ts-expect-error temporary
      if (this.precedence > this.lhs.precedence) {
        lhsExpression = `( ${lhsExpression} )`;
      }
    } else {
      // @ts-expect-error temporary
      lhsExpression = this.lhs;
    }

    // @ts-expect-error temporary
    if (this.rhs instanceof OpNode) {
      // @ts-expect-error temporary
      rhsExpression = this.rhs.getExpression();

      if (
        // @ts-expect-error temporary
        this.precedence >= this.rhs.precedence
        &&
        // @ts-expect-error temporary
        this.associativity !== Assoc.right
      ) {
        rhsExpression = `( ${rhsExpression} )`;
      }
    } else {
      // @ts-expect-error temporary
      rhsExpression = this.rhs;
    }

    // @ts-expect-error temporary
    return `${lhsExpression} ${this.operator} ${rhsExpression}`;
  }
}
