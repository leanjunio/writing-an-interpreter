export enum TokenType {
  Number = "NUMBER",
  Identifier = "IDENTIFIER",
  Equals = "EQUALS",
  OpenParen = "OPEN_PAREN",
  CloseParen = "CLOSE_PAREN",
  BinaryOperator = "BINARY_OPERATOR",
  Let = "LET",
  Semicolon = "SEMICOLON",
}

const KEYWORDS: Record<string, TokenType> = {
  let: TokenType.Let,
};

const SYMBOLS: Record<string, string> = {
  LPAREN: "(",
  RPAREN: ")",
  SEMICOLON: ";",
  EQUALS: "=",
  PLUS: "+",
  MINUS: "-",
  ASTERISK: "*",
  SLASH: "/",
};

export interface Token {
  value: string;
  type: TokenType;
}

function token(value: string = "", type: TokenType): Token {
  return { value, type };
}

/**
 * Check if the given character is a letter
 * @param source - The character to check
 * @returns True if the character is a letter, false otherwise
 */
function isAlpha(source: string): boolean {
  return source.toLowerCase() !== source.toUpperCase();
}

/**
 * Check if the given character is a digit
 * @param source - The character to check
 * @returns True if the character is a digit, false otherwise
 */
function isInt(source: string): boolean {
  const c = source.charCodeAt(0);
  const bounds = ["0".charCodeAt(0), "9".charCodeAt(0)];
  return c >= bounds[0] && c <= bounds[1];
}

/**
 * Check if the given character is a whitespace character
 * @param source - The character to check
 * @returns True if the character is a whitespace character, false otherwise
 */
function isWhitespace(source: string): boolean {
  return source === " " || source === "\n" || source === "\t";
}

export function tokenize(input: string): Token[] {
  const tokens = new Array<Token>();
  const source = input.split("");

  // build each token till EOF
  while (source.length > 0) {
    if (source[0] === SYMBOLS.LPAREN) {
      tokens.push(token(source.shift(), TokenType.OpenParen));
    } else if (source[0] === SYMBOLS.RPAREN) {
      tokens.push(token(source.shift(), TokenType.CloseParen));
    } else if (source[0] === SYMBOLS.SEMICOLON) {
      tokens.push(token(source.shift(), TokenType.Semicolon));
    } else if (source[0] === SYMBOLS.EQUALS) {
      tokens.push(token(source.shift(), TokenType.Equals));
    } else if (
      source[0] === SYMBOLS.PLUS ||
      source[0] === SYMBOLS.MINUS ||
      source[0] === SYMBOLS.ASTERISK ||
      source[0] === SYMBOLS.SLASH
    ) {
      tokens.push(token(source.shift(), TokenType.BinaryOperator));
    } else {
      if (isInt(source[0])) {
        buildNumberToken(source, tokens);
      } else if (isAlpha(source[0])) {
        buildIdentifierToken(source, tokens);
      } else if (isWhitespace(source[0])) {
        source.shift();
      } else {
        throw new Error(`Unrecognized character found in source: ${source[0]}`);
      }
    }
  }

  return tokens;
}

/**
 * Build a number token from the given source
 * @param source - The source to build the token from
 * @param tokens - The tokens to add the token to
 */
function buildNumberToken(source: string[], tokens: Token[]) {
  let number = "";

  while (source.length > 0 && isInt(source[0])) {
    number += source.shift();
  }

  tokens.push(token(number, TokenType.Number));
}

/**
 * Build an identifier token from the given source
 *
 * Checks if the identifier is a keyword and adds the token to the tokens array
 * @param source - The source to build the token from
 * @param tokens - The tokens to add the token to
 */
function buildIdentifierToken(source: string[], tokens: Token[]) {
  let identifier = "";

  while (source.length > 0 && isAlpha(source[0])) {
    identifier += source.shift();
  }

  const keyword = KEYWORDS[identifier];

  if (!keyword) {
    tokens.push(token(identifier, TokenType.Identifier));
  } else {
    tokens.push(token(identifier, keyword));
  }
}
