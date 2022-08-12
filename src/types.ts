export enum Associativity {
  L = 'L',
  R = 'R',
}

export interface Operator {
  associativity?: Associativity;
  precedence: number;
  operator: string;
}
