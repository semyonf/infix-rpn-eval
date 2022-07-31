import Associativity from './associativity';

// todo make this into a readonly object
const operations = new Map([
  ['exponentiation',
    { operator: '^', precedence: 4, associativity: Associativity.right }
  ],
  ['multiplication',
    { operator: '*', precedence: 3, associativity: Associativity.left }
  ],
  ['division',
    { operator: '/', precedence: 3, associativity: Associativity.left }
  ],
  ['addition',
    { operator: '+', precedence: 2, associativity: Associativity.left }
  ],
  ['subtraction',
    { operator: '-', precedence: 2, associativity: Associativity.left }
  ],
  ['bracket',
    { precedence: 0, isBracket: true }
  ],
]);

operations.set = operations.clear = operations.delete = () => {
  throw new Error('This map is frozen!');
};

export default operations;
