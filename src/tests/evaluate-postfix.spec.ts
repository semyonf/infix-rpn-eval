import assert from 'assert';
import { evaluatePostfix } from '../index';

const problems = Object.freeze({
  add: new Map([
    ['3 2 +', 5],
    ['3 3 3 + +', 9],
    ['0 0 +', 0],
  ]),
  sub: new Map([
    ['3 2 -', 1],
    ['3 3 3 - -', 3],
    ['5 20 -', -15],
  ]),
  div: new Map([
    ['3 3 /', 1],
    ['9 3 / 3 /', 1],
  ]),
  mul: new Map([
    ['7 3 *', 21],
    ['3 4 * 5 *', 60],
  ]),
  exp: new Map([
    ['2 5 ^', 32],
    ['2 6 ^', 64],
    ['2 3 ^ 2 ^', 64],
  ]),
  'complex expressions': new Map([
    ['3 2 + 3 * 2 ^ 25 - 20 /', 10],
    ['30.2 0.2 - 3 / 2 ^', 100],
  ]),
});

describe('Evaluation', () => {
  Object.keys(problems).forEach((kindOfProblems) => {
    it(`Handles ${kindOfProblems}`, () => {
      for (const [problem, expected] of problems[kindOfProblems]) {
        const actual = evaluatePostfix(problem);
        assert.strictEqual(actual, expected);
      }
    });
  });
});
