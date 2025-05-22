export type Token = {
  type: TokenType;
  literal: string;
};

export enum TokenType {
  ILLEGAL = "ILLEGAL",
  EOF = "EOF",

  // identifiers + literals
  IDENT = "IDENT",
  INT = "INT",

  // operators
  ASSIGN = "ASSIGN",
  PLUS = "PLUS",

  // delimiters
  COMMA = "COMMA",
  SEMICOLON = "SEMICOLON",
  LPAREN = "LPAREN",
  RPAREN = "RPAREN",
  LBRACE = "LBRACE",
  RBRACE = "RBRACE",

  // keywords
  FUNCTION = "FUNCTION",
  LET = "LET",
}

export const KEYWORDS = {
  fn: TokenType.FUNCTION,
  let: TokenType.LET,
};

export function lookupIdent(ident: string): TokenType {
  const keywords = KEYWORDS[ident as keyof typeof KEYWORDS];
  return keywords || TokenType.IDENT;
}
