import { cleanInput } from "../repl.js";
import { describe, expect, test } from "vitest";

describe.each([
  {
    input: "hello world",
    expected: ["hello", "world"],
  },
  {
    input: "  hello  world  ",
    expected: ["hello", "world"],
  },
  {
    input: "helloworld",
    expected: ["helloworld"],
  },
  {
    input: "Hello World",
    expected: ["hello", "world"],
  },
  {
    input: "   ",
    expected: [],
  },
  // TODO: more test cases here
])("cleanInput($input)", ({ input, expected }) => {
  test(`Expected: [${expected}]`, () => {
    const actual = cleanInput(input);
    expect(actual).toHaveLength(expected.length);
    for (const i in expected) {
      expect(actual[i]).toBe(expected[i]);
    }
  });
});
