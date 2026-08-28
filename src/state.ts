import { createInterface, Interface } from "readline";
import {
  commandExit,
  commandHelp,
  commandMap,
  commandMapB,
} from "./commands/index.js";
import { PokeAPI } from "./pokeapi.js";

export type State = {
  readline: Interface;
  commandRegistry: Record<string, CLICommand>;
  pokeAPI: PokeAPI;
  nextLocationsURL: string | undefined;
  prevLocationsURL: string | undefined;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export function initState(): State {
  return {
    readline: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "Pokedex > ",
    }),
    commandRegistry: {
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
      map: {
        name: "map",
        description: "List the next 20 location areas",
        callback: commandMap,
      },
      mapb: {
        name: "mapb",
        description: "List the previous 20 location areas",
        callback: commandMapB,
      },
    },
    pokeAPI: new PokeAPI(),
    nextLocationsURL: "/location-area/?offset=0&limit=20",
    prevLocationsURL: undefined,
  };
}
