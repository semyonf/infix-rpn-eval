export enum Associativity {
  Left = 'L',
  Right = 'R',
}

export type Operator =
  | {
      associativity: Associativity;
      operator: string;
      precedence: number;
    }
  | { isBracket: true; precedence: 0 };

export const operators: Record<string, Operator> = {
  exp: { operator: '^', precedence: 4, associativity: Associativity.Right },
  mul: { operator: '*', precedence: 3, associativity: Associativity.Left },
  div: { operator: '/', precedence: 3, associativity: Associativity.Left },
  add: { operator: '+', precedence: 2, associativity: Associativity.Left },
  sub: { operator: '-', precedence: 2, associativity: Associativity.Left },
  bracket: { precedence: 0, isBracket: true },
};

export const postfixOperators = {
  '^': operators.exp,
  '*': operators.mul,
  '/': operators.div,
  '+': operators.add,
  '-': operators.sub,
} as const;

export const infixOperators = {
  ...postfixOperators,
  '(': operators.bracket,
} as const;
