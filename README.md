# infix-rpn-eval

![master](https://github.com/semyonf/infix-rpn-eval/actions/workflows/ci.yml/badge.svg?branch=master)
[![npm version](https://badge.fury.io/js/infix-rpn-eval.svg)](https://badge.fury.io/js/infix-rpn-eval)
[![GitHub forks](https://img.shields.io/github/forks/semyonf/infix-rpn-eval.svg)](https://github.com/semyonf/infix-rpn-eval/network)
[![GitHub issues](https://img.shields.io/github/issues/semyonf/infix-rpn-eval.svg)](https://github.com/semyonf/infix-rpn-eval/issues)
[![GitHub license](https://img.shields.io/github/license/semyonf/infix-rpn-eval.svg)](https://github.com/semyonf/infix-rpn-eval/blob/master/LICENSE)
[![Maintainability](https://api.codeclimate.com/v1/badges/b975d2aca75290c17cd5/maintainability)](https://codeclimate.com/github/semyonf/infix-rpn-eval/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/b975d2aca75290c17cd5/test_coverage)](https://codeclimate.com/github/semyonf/infix-rpn-eval/test_coverage)

A JavaScript Implementation of Edsger Dijkstra's Shunting-yard algorithm. Works in Node.js and web browsers.

## Installation

```bash
$ npm install infix-rpn-eval
```

## Usage

> Tokens must be space-separated! Unary `-` goes with its operand, e.g. `-4`

```js
var infixRpnEval = require("infix-rpn-eval");

infixRpnEval.toPostfix('2 + 3 ^ 3 * ( 1 + 4 )'); // 2 3 3 ^ 1 4 + * +
infixRpnEval.toInfix('2 3 3 * +');               // 2 + 3 * 3
infixRpnEval.evaluatePostfix('2 3 3 * +');       // 11
infixRpnEval.evaluateInfix('2 + 2 * 2');         // 6

infixRpnEval.evaluateInfix('a + b', {
  evaluateMathConstants: {
    // default
    pi: Math.PI,
    tau: Math.PI * 2,
    e: Math.E,
    // custom
    a: 100,
    b: 150
  }
}); // 250
```
