const Associativity = require('./Associativity');

module.exports = new Map([
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
