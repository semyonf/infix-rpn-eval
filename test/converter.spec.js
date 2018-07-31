const assert = require('assert');
const converter = require('../converter');

describe('Infix to postfix conversion', () => {
  it('2 * 2 * 2', () => {
    assert.strictEqual(converter.toPostfix('2 * 2 * 2'), '22*2*');
  });

  it('x ^ y / 5 * z + 10', () => {
    assert.strictEqual(converter.toPostfix('x ^ y / 5 * z + 10'), 'xy^5/z*10+');
  });

  it('x ^ y / ( 5 * z ) + 10', () => {
    assert.strictEqual(converter.toPostfix('x ^ y / ( 5 * z ) + 10'), 'xy^5z*/10+');
  });
});