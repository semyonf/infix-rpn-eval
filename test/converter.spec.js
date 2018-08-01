const assert = require('assert');
const converter = require('../converter');

describe('Infix to postfix conversion', () => {
  const expressions = new Map([
    ['2 * 2 * 2', '2 2 * 2 *'],
    ['x ^ y / 5 * z + 10', 'x y ^ 5 / z * 10 +'],
    ['x ^ y / ( 5 * z ) + 10', 'x y ^ 5 z * / 10 +'],
    ['a / b / c / d', 'a b / c / d /'],
    ['a ^ b ^ c ^ d', 'a b c d ^ ^ ^'],
    ['a * b + c * d', 'a b * c d * +'],
    ['( a + b ) * c - ( d - e ) * ( f + g )', 'a b + c * d e - f g + * -'],
  ]);

  for (const [infix, postfix] of expressions) {
    it(`Converts ${infix}`, () => {
      assert.strictEqual(converter.toPostfix(infix), postfix);
    });
  }
});
