import { createInterface } from "node:readline/promises";

export function cleanInput(input: string): string[] {
  const trimmed = (input ?? "").trim();
  if (trimmed === "") return [];
  return trimmed.toLowerCase().split(/\s+/);
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  rl.prompt();
  rl.on("line", (line) => {
    const clean = cleanInput(line);
    if (clean.length > 0) console.log(`Your command was: ${clean[0]}`);
    rl.prompt();
  });
}
