import assert from 'assert';
import expressionMaps from './resources/expression-maps';
import * as calc from '../main';

describe('Postfix to infix conversion', () => {
  for (const [infix, postfix] of expressionMaps) {
    it(`Converts ${postfix}`, () => {
      assert.strictEqual(calc.toInfix(postfix), infix);
    });
  }
});
