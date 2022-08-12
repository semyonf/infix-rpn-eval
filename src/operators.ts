export enum Associativity {
  L = 'L',
  R = 'R',
}

export interface Operator {
  associativity: Associativity;
  operator: string;
  precedence: number;
}

export const operators = {
  exp: { operator: '^', precedence: 4, associativity: Associativity.R },
  mul: { operator: '*', precedence: 3, associativity: Associativity.L },
  div: { operator: '/', precedence: 3, associativity: Associativity.L },
  add: { operator: '+', precedence: 2, associativity: Associativity.L },
  sub: { operator: '-', precedence: 2, associativity: Associativity.L },
  bkt: { operator: '(', precedence: 0, associativity: Associativity.L },
} as const;

export const postfixOperators = {
  '^': operators.exp,
  '*': operators.mul,
  '/': operators.div,
  '+': operators.add,
  '-': operators.sub,
} as const;

export const infixOperators = {
  ...postfixOperators,
  '(': operators.bkt,
} as const;
