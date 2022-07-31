import assert from 'assert';
import {toPostfix} from '../main';
import expressionMaps from './resources/expression-maps';

describe('Infix to postfix conversion', () => {
  for (const [infix, postfix] of expressionMaps) {
    it(`Converts ${infix}`, () => {
      assert.strictEqual(toPostfix(infix), postfix);
    });
  }
});
