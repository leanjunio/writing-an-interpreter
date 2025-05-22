import { tokenize, TokenType } from "./lexer";

describe("Lexer", () => {
  it("should return the correct tokens for each character in the input", () => {
    const input = `let x = 45;`;

    const expectedTokens = [
      { type: TokenType.Let, value: "let" },
      { type: TokenType.Identifier, value: "x" },
      { type: TokenType.Equals, value: "=" },
      { type: TokenType.Number, value: "45" },
      { type: TokenType.Semicolon, value: ";" },
    ];

    const tokens = tokenize(input);

    for (const token of tokens) {
      const expectedToken = expectedTokens.shift();
      expect(token.type).toBe(expectedToken?.type);
      expect(token.value).toBe(expectedToken?.value);
    }
  });
});
