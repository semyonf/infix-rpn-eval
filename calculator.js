/**
 * Evaluate postfix expression
 * @param postfix tokens must be space separated
 * @returns {number}
 */
exports.evaluatePostfix = function (postfix) {
  const tokens = postfix.split(' ');
  const stack = [];

  for (const token of tokens) {
    if (!['+', '-', '/', '*', '^', ':'].includes(token)) {
      stack.push(parseFloat(token));
    } else {
      const operands = [stack.pop(), stack.pop()].reverse();
      stack.push(operands.reduce((prev, curr) => {
        switch (token) {
          case '+':
            return prev + curr;
          case '-':
            return prev - curr;
          case '*':
            return prev * curr;
          case '/':
          case ':':
            return prev / curr;
          case '^':
            return Math.pow(prev, curr);
        }
      }));
    }
  }

  return stack.pop();
};

/**
 * Convert from infix to postfix notation
 * @param infix {string} tokens must be space separated
 * @returns {string}
 */
exports.toPostfix = function (infix) {
  const Associativity = Object.freeze({ left: Symbol(), right: Symbol() });
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
    throw new Error('Map is frozen!');
  };

  /**
   * todo: implement constants e.g. PI, E, TAU
   * todo: implement functions e.g. sin cos tg
   * todo: implement nested brackets e.g. ( a + b * ( c - d) - e) + f
   */
  const operators = Object.freeze({
    '^': operations.get('exponentiation'),
    '*': operations.get('multiplication'),
    '/': operations.get('division'),
    ':': operations.get('division'),
    '+': operations.get('addition'),
    '-': operations.get('subtraction'),
    '(': operations.get('bracket'),
  });

  const tokens = infix.split(' ');
  const outputStack = [];
  const operatorStack = [];

  for (const token of tokens) {
    if (token in operators) {
      const op1 = operators[token];

      while (operatorStack.length) {
        const op2 = operatorStack[operatorStack.length - 1];

        if (
          (op1.associativity === Associativity.left &&
            op1.precedence <= op2.precedence)
          ||
          (op1.associativity === Associativity.right &&
            op1.precedence < op2.precedence)
        ) {
          operatorStack.pop();
          outputStack.push(op2.operator);
        } else {
          break;
        }
      }

      operatorStack.push(op1);
    } else {
      if (token === ')') {
        while (!operatorStack[operatorStack.length - 1].isBracket) {
          outputStack.push(operatorStack.pop().operator);
        }
        operatorStack.pop();
      } else {
        outputStack.push(token);
      }
    }
  }

  const res = outputStack
    .concat(
      operatorStack
        .reverse()
        .map(x => x.operator)
    );

  return res.join(' ');
};
