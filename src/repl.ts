import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const trimmed = (input ?? "").trim();
  if (trimmed === "") return [];
  return trimmed.toLowerCase().split(/\s+/);
}

export function startREPL(state: State) {
  const rl = state.readline;
  rl.prompt();
  rl.on("line", (line) => {
    const input = cleanInput(line);
    const command = state.commandRegistry[input[0]];
    if (command === undefined) {
      console.log("Unknown command");
    } else {
      command.callback(state);
    }
    rl.prompt();
  });
}
