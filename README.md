# infix-rpn-eval

[![Build Status](https://travis-ci.org/semyonf/infix-rpn-eval.svg?branch=master)](https://travis-ci.org/semyonf/infix-rpn-eval)
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

infixRpnEval.toPostfix('2 + 3 * 3');       // '2 3 3 * +'
infixRpnEval.toInfix('2 3 3 * +');         // '2 + 3 * 3'
infixRpnEval.evaluatePostfix('2 3 3 * +'); // 11
infixRpnEval.evaluateInfix('2 + 2 * 2');   // 6
```

## API

```js
/**
 * Convert from infix to postfix notation
 * @param {string} infix tokens must be space separated
 * @returns {string}
 */
infixRpnEval.toPostfix = (infix) {...}

/**
 * Convert from postfix to infix notation
 * @param {string} postfix tokens must be space separated
 * @returns {string}
 */
infixRpnEval.toInfix = (postfix) {...}

/**
 * Evaluate postfix expression
 * @param {string} postfix tokens must be space separated
 * @returns {number}
 */
infixRpnEval.evaluatePostfix = (postfix) {...}

/**
 * Evaluate infix expression
 * @param {string} infix tokens must be space separated
 * @returns {number}
 */
infixRpnEval.evaluateInfix = (infix) {...}
```
