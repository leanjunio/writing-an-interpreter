import { Lexer } from "./lexer";

describe("Lexer", () => {
  it("should return the correct tokens for each character in the input", () => {
    const input = `=+(){},; `;
    const expectedTokens = [
      { type: "ASSIGN", literal: "=" },
      { type: "PLUS", literal: "+" },
      { type: "LPAREN", literal: "(" },
      { type: "RPAREN", literal: ")" },
      { type: "LBRACE", literal: "{" },
      { type: "RBRACE", literal: "}" },
      { type: "COMMA", literal: "," },
      { type: "SEMICOLON", literal: ";" },
      { type: "EOF", literal: "" },
    ];

    const lexer = new Lexer(input);
    for (const token of expectedTokens) {
      const tok = lexer.nextToken();
      if (tok.type !== token.type) {
        console.log(
          "test failed: expected next token to be %s, got %s",
          token.type,
          tok.type
        );
      }

      if (tok.literal !== token.literal) {
        console.log(
          "test failed: expected next token to be %s, got %s",
          token.literal,
          tok.literal
        );
      }
    }
  });
});
