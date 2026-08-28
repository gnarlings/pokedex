import { State } from "../state.js";

export async function commandMap(state: State) {
  if (state.nextLocationsURL === undefined) {
    console.log("No next location areas");
    return;
  }
  const locations = await state.pokeAPI.fetchLocations(state.nextLocationsURL);
  locations.results.forEach((loc) => {
    console.log(loc.name);
  });
  state.prevLocationsURL = state.nextLocationsURL;
  state.nextLocationsURL = locations.next?.substring(25) ?? undefined;
}
