export enum Associativity {
  left = 'Left',
  right = 'Right',
}

export type Operator =
  | {
      associativity: Associativity;
      operator: string;
      precedence: number;
    }
  | { isBracket: true; precedence: 0 };

export const operators: Record<string, Operator> = {
  exp: { operator: '^', precedence: 4, associativity: Associativity.right },
  mul: { operator: '*', precedence: 3, associativity: Associativity.left },
  div: { operator: '/', precedence: 3, associativity: Associativity.left },
  add: { operator: '+', precedence: 2, associativity: Associativity.left },
  sub: { operator: '-', precedence: 2, associativity: Associativity.left },
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
