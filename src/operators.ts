import type { Operator } from './types';
import { Associativity } from './types';

const operators: Record<string, Operator> = {
  oparen: { operator: '(', precedence: Number.POSITIVE_INFINITY },
  cparen: { operator: ')', precedence: Number.POSITIVE_INFINITY },
  exp: { operator: '^', precedence: 3, associativity: Associativity.R },
  mul: { operator: '*', precedence: 2, associativity: Associativity.L },
  div: { operator: '/', precedence: 2, associativity: Associativity.L },
  add: { operator: '+', precedence: 1, associativity: Associativity.L },
  sub: { operator: '-', precedence: 1, associativity: Associativity.L },
};

export const postfixOperators: Record<string, Operator> = {
  '^': operators['exp'] as Operator,
  '*': operators['mul'] as Operator,
  '/': operators['div'] as Operator,
  '+': operators['add'] as Operator,
  '-': operators['sub'] as Operator,
};

export const infixOperators: Record<string, Operator> = {
  ...postfixOperators,
  '(': operators['oparen'] as Operator,
  ')': operators['cparen'] as Operator,
};
