export type TokenType = string;

export type Token = {
  type: TokenType,
  literal: string
}

export const TokenType = {
  ILLEGAL: "ILLEGAL",
  EOF: "EOF",

  // identifiers + literals
  IDENT: "IDENT",
  INT: "INT",

  // operators
  ASSIGN: "=",
  PLUS: "+",

  // delimiters
  COMMA: ",",
  SEMICOLON: ";",
  LPAREN: "(",
  RPAREN: ")",
  LBRACE: "{",
  RBRACE: "}",

  // keywords
  FUNCTION: "FUNCTION",
  LET: "LET"
}