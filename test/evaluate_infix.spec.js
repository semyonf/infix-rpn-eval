const assert = require('assert');
const calc = require('../main');

describe('Infix evaluation', () => {
  it('is ok', () => {
    assert.strictEqual(
      calc.evaluateInfix('2 + 2 * 2'),
      6
    );
  });
});
