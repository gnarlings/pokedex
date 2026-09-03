import { State } from "../state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length === 0) {
    console.log("Please include a Pokemon name.");
    return;
  }
  const pokemonName = args[0];
  const pokemon = await state.pokeAPI.fetchPokemon(pokemonName);
  console.log(`Throwing a Pokeball at ${pokemonName}...`);
  const isCaptured =
    Math.floor(Math.random() * 1000) >= pokemon.base_experience;
  console.log(`${pokemonName} ${isCaptured ? "was caught" : "escaped"}!`);
  if (isCaptured) {
    state.pokedex[pokemonName] = pokemon;
    console.log("You may now inspect it with the inspect command");
  }
}
