; ── keywords ─────────────────────────────────────────────────────

(type_expression
  "type" @keyword
  "in" @keyword)

(type_expression
  "and" @keyword)

(if_expression
  "if" @keyword
  "then" @keyword
  "else" @keyword)

(let_expression
  "let" @keyword
  "in" @keyword)

(let_expression
  "rec" @keyword)

(let_expression
  "and" @keyword)

(match_expression
  "match" @keyword)

; ── operators ────────────────────────────────────────────────────

(lambda_expression
  "|" @operator)

(match_arm
  "|" @operator
  "=>" @operator)

(union_type
  "|" @operator)

(type_expr
  "->" @operator)

(variant
  "|" @operator)

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

; ── punctuation ──────────────────────────────────────────────────

[
  "("
  ")"
] @punctuation.bracket

"," @punctuation.delimiter

; ── literals ─────────────────────────────────────────────────────

(integer) @number
(float) @number.float
(boolean) @constant.builtin

; ── type definitions ─────────────────────────────────────────────

(variant
  name: (identifier) @constructor)

; ── variable definitions ─────────────────────────────────────────

(let_binding
  name: (bind_pattern
    (identifier) @variable.definition))

(tuple_bind_pattern
  (bind_pattern
    (identifier) @variable.definition))

(let_binding
  parameter: (identifier) @variable.parameter)

(lambda_expression
  (pattern (identifier) @variable.parameter))

(match_arm
  pattern: (pattern (identifier) @variable.definition))

; ── references ───────────────────────────────────────────────────

; Generic identifier reference (will be overridden below)
(atom (identifier) @variable)

; Uppercase identifiers in expression positions are constructors
((atom (identifier) @constructor)
  (#match? @constructor "^[A-Z]"))

; Uppercase identifiers in pattern positions are constructors
((match_arm
  pattern: (pattern (identifier) @constructor))
  (#match? @constructor "^[A-Z]"))

; ── type expressions ─────────────────────────────────────────────

(type_atom (identifier) @type)
