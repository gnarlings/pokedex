import { State } from "../state.js";

export async function commandPokedex(state: State) {
  const pokedexNames = Object.keys(state.pokedex);
  if (pokedexNames.length === 0) {
    console.log("Pokedex empty. Go catch some Pokemon.");
    return;
  }
  console.log("Your Pokedex:");
  pokedexNames.forEach((name) => {
    console.log(`  ${name}`);
  });
}
