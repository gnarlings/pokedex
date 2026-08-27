import { State } from "../state.js";

export function commandHelp(state: State) {
  console.log("Welcome to the Pokedex!\nUsage:\n");
  Object.values(state.commandRegistry).forEach((command) => {
    console.log(`${command.name}: ${command.description}`);
  });
}
