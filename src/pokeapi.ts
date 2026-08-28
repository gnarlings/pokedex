import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(3_600_600);

  constructor() {}

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = `${PokeAPI.baseURL}${pageURL ?? "/location-area"}`;
    const entry: ShallowLocations | undefined = this.#cache.get(url);
    if (entry) {
      return entry;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Reponse status: ${response.status}`);

      const result: ShallowLocations = await response.json();
      this.#cache.add(url, result);
      return result;
    } catch (error) {
      console.error(error, (error as Error).cause);
      throw error;
    }
  }

  async fetchLocation(locationName: string): Promise<LocationArea> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;
    const entry: LocationArea | undefined = this.#cache.get(url);
    if (entry) {
      return entry;
    }
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Reponse status: ${response.status}`);

      const result: LocationArea = await response.json();
      this.#cache.add(url, result);
      return result;
    } catch (error) {
      console.error(error, (error as Error).cause);
      throw error;
    }
  }

  stopCacheReapLoop() {
    this.#cache.stopReapLoop();
  }
}

export type ShallowLocations = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ShallowLocation[];
};

export type ShallowLocation = {
  name: string;
  url: string;
};

export type LocationArea = {
  id: number;
  name: string;
  game_index: number;
  encounter_method_rates: EncounterMethodRate[];
  location: Location;
  names: Name[];
  pokemon_encounters: PokemonEncounter[];
};

export interface EncounterMethodRate {
  encounter_method: EncounterMethod;
  version_details: VersionDetail[];
}

export interface EncounterMethod {
  name: string;
  url: string;
}

export interface VersionDetail {
  rate: number;
  version: Version;
}

export interface Version {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Name {
  name: string;
  language: Language;
}

export interface Language {
  name: string;
  url: string;
}

export interface PokemonEncounter {
  pokemon: Pokemon;
  version_details: VersionDetail2[];
}

export interface Pokemon {
  name: string;
  url: string;
}

export interface VersionDetail2 {
  version: Version2;
  max_chance: number;
  encounter_details: EncounterDetail[];
}

export interface Version2 {
  name: string;
  url: string;
}

export interface EncounterDetail {
  min_level: number;
  max_level: number;
  condition_values: any[];
  chance: number;
  method: Method;
}

export interface Method {
  name: string;
  url: string;
}
