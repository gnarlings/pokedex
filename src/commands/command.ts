import { commandExit } from "./exit.js";
import { commandHelp } from "./help.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: () => void;
};

export function getCommands(): Record<string, CLICommand> {
  return {
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
    exit: {
      name: "exit",
      description: "Exit the Pokedex",
      callback: commandExit,
    },
  };
}
