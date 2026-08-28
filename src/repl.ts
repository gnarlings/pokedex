import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const trimmed = (input ?? "").trim();
  if (trimmed === "") return [];
  return trimmed.toLowerCase().split(/\s+/);
}

export async function startREPL(state: State) {
  const rl = state.readline;
  rl.prompt();
  rl.on("line", async (line) => {
    const input = cleanInput(line);
    const command = state.commandRegistry[input[0]];
    if (command === undefined) {
      console.log("Unknown command");
    } else {
      rl.pause();
      await command.callback(state);
      rl.resume();
    }
    rl.prompt();
  });
}
