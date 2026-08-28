import { Cache } from "./pokecache.js";
import { LocationArea } from "./types/location-area.js";
import { Pokemon } from "./types/pokemon.js";
import { ShallowLocations } from "./types/shallow-locations.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(3_600_600);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    return await this.fetch(`${PokeAPI.baseURL}${pageURL ?? "/location-area"}`);
  }

  async fetchLocationArea(locationAreaName: string): Promise<LocationArea> {
    return await this.fetch(
      `${PokeAPI.baseURL}/location-area/${locationAreaName}`,
    );
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    return await this.fetch(`${PokeAPI.baseURL}/pokemon/${pokemonName}`);
  }

  async fetch<T>(url: string) {
    const entry: T | undefined = this.#cache.get(url);
    if (entry) {
      return entry;
    }
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Response status: ${response.status}`);

    const result: T = await response.json();
    this.#cache.add(url, result);
    return result;
  }

  stopCacheReapLoop() {
    this.#cache.stopReapLoop();
  }
}
