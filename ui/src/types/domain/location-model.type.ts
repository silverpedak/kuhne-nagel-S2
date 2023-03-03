export interface Location {
  id: number;
  title: string;
  address: string;
  country: string;
  zipcode: string | number | null;
  owner: {
    id: number;
    name: string;
  };
  longitude: number;
  latitude: number;
  typeId: 0 | 1 | 2 | 3 | 4;
}

export const emptyLocation: Location = {
  id: 0,
  title: "",
  address: "",
  country: "",
  zipcode: "",
  owner: {
    id: 0,
    name: "",
  },
  longitude: 0,
  latitude: 0,
  typeId: 0,
};
