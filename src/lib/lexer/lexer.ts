import { Token, TokenType } from "../../types/token";

export class Lexer {
  private input: string;

  private position: number;
  private readPosition: number;
  private ch: number;

  constructor(input: string) {
    this.input = input;
    this.position = 0;
    this.readPosition = 0;
  }

  /**
   * Reads the next character from the input and advances the position
   * If the end of the input is reached, the character is set to 0 (null).
   * Otherwise, the character is set to the next character in the input.
   */
  readChar() {
    const isEndOfInput = this.readPosition >= this.input.length;

    if (isEndOfInput) {
      this.ch = 0;
    } else {
      this.ch = this.input.charCodeAt(this.readPosition);
    }

    this.position = this.readPosition;
    this.readPosition++;
  }

  /**
   * Creates a token for the given character.
   * @param type - The type of the token.
   * @param ch - The character to create the token for.
   * @returns The created token.
   */
  createToken(type: TokenType, ch: number) {
    return { type, literal: String.fromCharCode(ch) };
  }

  /**
   * Reads the current character and returns the associated token for it.
   */
  nextToken() {
    let tok: Token;

    switch (String.fromCharCode(this.ch)) {
      case "=":
        tok = this.createToken(TokenType.ASSIGN, this.ch);
        break;
      case "+":
        tok = this.createToken(TokenType.PLUS, this.ch);
        break;
      case "(":
        tok = this.createToken(TokenType.LPAREN, this.ch);
        break;
      case ")":
        tok = this.createToken(TokenType.RPAREN, this.ch);
        break;
      case "{":
        tok = this.createToken(TokenType.LBRACE, this.ch);
        break;
      case "}":
        tok = this.createToken(TokenType.RBRACE, this.ch);
        break;
      case ",":
        tok = this.createToken(TokenType.COMMA, this.ch);
        break;
      case ";":
        tok = this.createToken(TokenType.SEMICOLON, this.ch);
        break;
      default:
        tok = this.createToken(TokenType.ILLEGAL, this.ch);
        break;
    }

    this.readChar();

    return tok;
  }
}
