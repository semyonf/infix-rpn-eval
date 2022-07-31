import assert from 'assert';
import {evaluateInfix} from '../main';

describe('Infix evaluation', () => {
  it('is ok', () => {
    assert.strictEqual(evaluateInfix('2 + 2 * 2'), 6);
  });
});
