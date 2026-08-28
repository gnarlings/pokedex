import { State } from "../state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("Please include a location area name.");
    return;
  }
  const locationAreaName = args[0];
  const locationArea = await state.pokeAPI.fetchLocationArea(locationAreaName);
  if (!locationArea) {
    console.log(`Invalid location area name: ${locationAreaName}`);
    return;
  }
  const encounters = locationArea.pokemon_encounters;
  if (encounters.length === 0) {
    console.log(`No encouters at ${locationAreaName}`);
    return;
  }
  console.log(`Exploring ${locationAreaName}...`);
  console.log("Found Pokemon:");
  locationArea.pokemon_encounters.forEach((encounter) => {
    console.log(`- ${encounter.pokemon.name}`);
  });
}
