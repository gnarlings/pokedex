import { getCommands } from "./command.js";

export function commandHelp() {
  console.log("Welcome to the Pokedex!\nUsage:\n");
  Object.values(getCommands()).forEach((command) => {
    console.log(`${command.name}: ${command.description}`);
  });
}
