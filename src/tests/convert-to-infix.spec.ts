import assert from 'assert';
import expressionMaps from './expression-maps';
import * as calc from '../index';

describe('Postfix to infix conversion', () => {
  for (const [infix, postfix] of expressionMaps) {
    it(`Converts ${postfix}`, () => {
      assert.strictEqual(calc.toInfix(postfix), infix);
    });
  }
});
