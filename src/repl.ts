import { createInterface } from "node:readline/promises";
import { getCommands } from "./commands/command.js";
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
    const input = cleanInput(line);
    const command = getCommands()[input[0]];
    if (command === undefined) {
      console.log("Unknown command");
    } else {
      command.callback();
    }
    rl.prompt();
  });
}
