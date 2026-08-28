import { State } from "../state.js";

export async function commandMapB(state: State) {
  if (state.prevLocationsURL === undefined) {
    console.log("No previous location areas");
    return;
  }
  const locations = await state.pokeAPI.fetchLocations(state.prevLocationsURL);
  locations.results.forEach((loc) => {
    console.log(loc.name);
  });
  state.nextLocationsURL = state.prevLocationsURL;
  state.prevLocationsURL = locations.previous?.substring(25) ?? undefined;
}
