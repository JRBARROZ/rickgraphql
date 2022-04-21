export default interface ICharacter {
  characters: {
    info: {
      count: number;
      pages: number;
    };
    results: IResults[];
  };
}

interface ILocation {
  name: string;
  residents: ICharacter[];
}
export interface IEpisode {
  name: string;
  air_date: string;
}

export interface IResults {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: ILocation;
  episode: IEpisode;
}
