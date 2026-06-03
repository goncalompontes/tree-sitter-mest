/**
 * @file A simple functional programming language made for learning purposes!
 * @author Gonçalo Pontes <gpm.pontes@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

const PREC = {
  OR: 1,
  AND: 2,
  COMPARE: 3,
  ADD: 4,
  MUL: 5,
  POW: 6,
  PREFIX: 7,
  CALL: 8,
};

export default grammar({
  name: "mest",

  word: $ => $.identifier,

  extras: $ => [/\s/],

  rules: {
    source_file: $ => $.expression,

    expression: $ => choice(
      $.if_expression,
      $.let_expression,
      $.match_expression,
      $.lambda_expression,
      $.simple_expression,
    ),

    simple_expression: $ => $.or_expression,

    if_expression: $ => seq(
      'if',
      field('condition', $.expression),
      'then',
      field('consequence', $.expression),
      'else',
      field('alternative', $.expression),
    ),

    let_expression: $ => seq(
      'let',
      optional('rec'),
      $.let_binding,
      repeat(seq('and', $.let_binding)),
      'in',
      field('body', $.expression),
    ),

    bind_pattern: $ => choice(
      $.identifier,
      $.tuple_bind_pattern,
    ),

    tuple_bind_pattern: $ => seq(
      '(',
      $.bind_pattern,
      ',',
      optional($.bind_pattern),
      repeat(seq(',', $.bind_pattern)),
      ')',
    ),

    let_binding: $ => seq(
      field('name', $.bind_pattern),
      repeat(field('parameter', $.identifier)),
      '=',
      field('value', $.expression),
    ),

    match_expression: $ => prec.right(seq(
      'match',
      field('value', $.simple_expression),
      repeat1($.match_arm),
    )),

    match_arm: $ => seq(
      '|',
      field('pattern', $.pattern),
      '=>',
      field('body', $.expression),
    ),

    lambda_expression: $ => seq(
      '|',
      $.pattern,
      '|',
      field('body', $.expression),
    ),

    or_expression: $ => prec.left(PREC.OR, seq(
      $.and_expression,
      repeat(seq('||', $.and_expression)),
    )),

    and_expression: $ => prec.left(PREC.AND, seq(
      $.comparison_expression,
      repeat(seq('&&', $.comparison_expression)),
    )),

    comparison_expression: $ => prec.left(PREC.COMPARE, seq(
      $.additive_expression,
      repeat(seq(choice('==', '!=', '<', '>', '<=', '>='), $.additive_expression)),
    )),

    additive_expression: $ => prec.left(PREC.ADD, seq(
      $.multiplicative_expression,
      repeat(seq(choice('+', '-'), $.multiplicative_expression)),
    )),

    multiplicative_expression: $ => prec.left(PREC.MUL, seq(
      $.power_expression,
      repeat(seq(choice('*', '/'), $.power_expression)),
    )),

    power_expression: $ => prec.right(PREC.POW, seq(
      $.prefix_expression,
      optional(seq('^', $.power_expression)),
    )),

    prefix_expression: $ => choice(
      $.not_expression,
      $.negative_expression,
      $.call_expression,
      $.atom,
    ),

    not_expression: $ => prec.right(PREC.PREFIX, seq(
      repeat1('!'),
      choice($.negative_expression, $.call_expression, $.atom),
    )),

    negative_expression: $ => prec.right(PREC.PREFIX, seq(
      repeat1('-'),
      choice($.call_expression, $.atom),
    )),

    call_expression: $ => prec.left(PREC.CALL, seq(
      $.atom,
      repeat1($.atom),
    )),

    atom: $ => choice(
      $.identifier,
      $.integer,
      $.float,
      $.boolean,
      $.tuple_expression,
      seq('(', $.expression, ')'),
    ),

    pattern: $ => choice(
      $.wildcard_pattern,
      $.literal,
      $.identifier,
      $.tuple_pattern,
    ),

    literal: $ => choice(
      $.integer,
      $.float,
      $.boolean,
    ),

    wildcard_pattern: $ => '_',

    identifier: $ => token(/[a-zA-Z_][a-zA-Z0-9_]*/),

    integer: $ => token(/[0-9]+/),

    float: $ => token(/[0-9]+\.[0-9]+/),

    boolean: $ => choice('true', 'false'),

    tuple_expression: $ => seq(
      '(',
      $.expression,
      ',',
      optional($.expression),
      repeat(seq(',', $.expression)),
      ')',
    ),

    tuple_pattern: $ => seq(
      '(',
      $.pattern,
      ',',
      optional($.pattern),
      repeat(seq(',', $.pattern)),
      ')',
    ),
  }
});
