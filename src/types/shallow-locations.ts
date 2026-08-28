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
