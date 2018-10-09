'use strict';

const assert = require('assert');
const calc = require('../main');
const expressionMaps = require('./resources/expression_maps');

describe('Infix to postfix conversion', () => {
  for (const [infix, postfix] of expressionMaps) {
    it(`Converts ${infix}`, () => {
      assert.strictEqual(calc.toPostfix(infix), postfix);
    });
  }
});
