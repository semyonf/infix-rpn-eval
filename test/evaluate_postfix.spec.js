const assert = require('assert');
const calc = require('../main');

describe('Evaluation of postfix expressions', () => {
  it('Evaluates addition', () => {
    assert.strictEqual(calc.evaluatePostfix('3 2 +'), 5);
    assert.strictEqual(calc.evaluatePostfix('3 3 3 + +'), 9);
    assert.strictEqual(calc.evaluatePostfix('3 3 -3 + +'), 3);
    assert.strictEqual(calc.evaluatePostfix('0 0 +'), 0);
  });

  it('Evaluates subtraction', () => {
    assert.strictEqual(calc.evaluatePostfix('3 2 -'), 1);
    assert.strictEqual(calc.evaluatePostfix('3 3 3 - -'), 3);
    assert.strictEqual(calc.evaluatePostfix('5 20 -'), -15);
  });

  it('Evaluates division', () => {
    assert.strictEqual(calc.evaluatePostfix('3 3 /'), 1);
    assert.strictEqual(calc.evaluatePostfix('9 3 / 3 /'), 1);
  });

  it('Evaluates multiplication', () => {
    assert.strictEqual(calc.evaluatePostfix('7 3 *'), 21);
    assert.strictEqual(calc.evaluatePostfix('3 4 * 5 *'), 60);
  });

  it('Evaluates exponentiation', () => {
    assert.strictEqual(calc.evaluatePostfix('2 5 ^'), 32);
    assert.strictEqual(calc.evaluatePostfix('2 6 ^'), 64);
    assert.strictEqual(calc.evaluatePostfix('2 3 ^ 2 ^'), 64);
  });

  it('Evaluates complex expressions', () => {
    assert.strictEqual(
      calc.evaluatePostfix('3 2 + 3 * 2 ^ 25 - 20 /'),
      10
    );

    assert.strictEqual(
      calc.evaluatePostfix('30.2 0.2 - 3 / 2 ^'),
      100
    );

    assert.strictEqual(
      calc.evaluatePostfix(
        calc.toPostfix('2 + 2 * 2')
      ),
      6
    );

    assert.strictEqual(
      calc.evaluatePostfix(
        calc.toPostfix('( 2 + 2 ) * 2')
      ),
      8
    );

    assert.strictEqual(
      calc.evaluatePostfix(
        calc.toPostfix('pi')
      ),
      Math.PI
    );

    assert.strictEqual(
      calc.evaluatePostfix(
        calc.toPostfix('pi ^ 2 / 2')
      ),
      4.934802200544679
    );

    assert.strictEqual(
      calc.evaluatePostfix(
        calc.toPostfix('( 4 / ( ( 2 + 2 ) * ( 4 - 2 ) ) )')
      ),
      0.5
    );

    assert.strictEqual(
      calc.evaluatePostfix(
        calc.toPostfix(
          calc.toInfix(
            calc.toPostfix(
              '( 2 + 2 ) * 3'
            )
          )
        )
      ),
      12
    );
  });
});
