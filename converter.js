const Associativity = Object.freeze({ left: 'l', right: 'r' });
const operators = Object.freeze({
  '^': { string: '^', prec: 4, assoc: Associativity.right },
  '*': { string: '*', prec: 3, assoc: Associativity.left },
  '/': { string: '/', prec: 3, assoc: Associativity.left },
  '+': { string: '+', prec: 2, assoc: Associativity.left },
  '-': { string: '-', prec: 2, assoc: Associativity.left },
});

const inputString = 'a + b * c - d';
const tokens = inputString.split(' ');
const outputStack = [];
const operatorStack = [];

for (const token of tokens) {
  if (!(token in operators)) {
    outputStack.push(token);
    continue;
  }

  const op1 = operators[token];

  if (!operatorStack.length) {
    operatorStack.push(op1);
    continue;
  }

  const op2 = operatorStack[operatorStack.length - 1];

  if (op2.prec < op1.prec) {
    operatorStack.push(op1);
    continue;
  }

  while (operatorStack.length) {
    const op2 = operatorStack[operatorStack.length - 1];

    if (
      (op1.assoc = Associativity.left && op1.prec <= op2.prec)
      ||
      (op1.assoc = Associativity.right && op1.prec < op2.prec)
    ) {
      operatorStack.pop();
      outputStack.push(op2.string);
    }
  }

  operatorStack.push(op1);
}

const res = outputStack
  .concat(
    operatorStack
      .reverse()
      .map(x => x.string)
  );

console.log(res);