'use strict';

const assert = require('assert');
const calc = require('../main');
const expressionMaps = require('./resources/expression_maps');

describe('Postfix to infix conversion', () => {
  for (const [infix, postfix] of expressionMaps) {
    it(`Converts ${postfix}`, () => {
      assert.strictEqual(calc.toInfix(postfix), infix);
    });
  }
});
