(if_expression
  "if" @keyword
  "then" @keyword
  "else" @keyword)

(let_expression
  "let" @keyword
  "in" @keyword)

(let_expression
  "rec" @keyword)

(match_expression
  "match" @keyword)

(lambda_expression
  "|" @operator)

(match_arm
  "|" @operator
  "=>" @operator)

[
  "+"
  "-"
  "*"
  "/"
  "^"
  "=="
  "!="
  "<"
  ">"
  "<="
  ">="
  "&&"
  "||"
  "!"
  "="
] @operator

[
  "("
  ")"
] @punctuation.bracket

(integer) @number
(float) @number.float
(boolean) @constant.builtin

(let_expression
  name: (identifier) @variable.definition)

(let_expression
  parameter: (identifier) @variable.parameter)

(lambda_expression
  parameter: (identifier) @variable.parameter)

(match_arm
  pattern: (pattern (identifier) @variable.definition))

(atom (identifier) @variable)
