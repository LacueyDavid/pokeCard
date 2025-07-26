export type Pokemon = {
  name: string;
  url: string;
  sprites: {
    front_default: string;
  };
  id: number;
  height?: number;
  weight?: number;
  abilities?: {
    ability: {
      name: string;
    };
  }[];
  types?: {
    type: {
      name: string;
    };
  }[];
};
