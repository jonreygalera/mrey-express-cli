import { isBlank, random } from "../utils/str";

describe("random", () => {
  test("generate random string", () => {
    expect(typeof random()).toBe("string");
  });
});

describe("isBlank", () => {
  test("it will return true for null", () => {
    expect(isBlank(null)).toBe(true);
  });

  test("it will return true for undefined", () => {
    expect(isBlank(undefined)).toBe(true);
  });

  test("it will return true for empty string", () => {
    expect(isBlank("")).toBe(true);
  });

  test("it will return true for whitespace-only string", () => {
    expect(isBlank("   ")).toBe(true);
  });

  test("it will return false for non-empty string", () => {
    expect(isBlank("hello")).toBe(false);
  });

  test("it will return false for string with content and whitespace", () => {
    expect(isBlank("  hello  ")).toBe(false);
  });
});