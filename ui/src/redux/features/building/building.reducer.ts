import { Building, EMPTY_BUILIDNG } from "@/types/domain";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BuildingState {
  entities: Building[];
  currentEntities: Building[];
  entity: Building;
}

const initialState: BuildingState = {
  entities: [
    {
      id: 1,
      locationId: 1,
      status: "error",
      address: "5 Brentwood Terrace",
      zipcode: "000001",
      latLng: {
        positions: [
          [59.42477, 24.80841],
          [59.42478, 24.808523654937744],
          [59.42457, 24.80859],
          [59.42456, 24.80848],
        ],
      },
      reception: {
        phone: "9005555",
      },
      securityPerson: {
        firstName: "Joe",
        lastName: "Schmoe",
        email: "joe.schmoe@security.com",
        phone: "+37253622748",
      },
      contactPerson: {
        firstName: "Michael",
        lastName: "Jordan",
        email: "mj@gmail.com",
        phone: "5230523",
      },
    },
    {
      id: 2,
      locationId: 1,
      status: "warning",
      address: "6 Brentwood Terrace",
      zipcode: "HMR",
      latLng: {
        positions: [
          [59.424903261028724, 24.808266162872314],
          [59.424916914160335, 24.80849146842957],
          [59.42494148978332, 24.80847001075745],
          [59.42496060414442, 24.80868458747864],
          [59.42493602853529, 24.80868458747864],
          [59.42492237541142, 24.80849146842957],
          [59.42481588085617, 24.808534383773804],
          [59.42480222768382, 24.808389544487003],
          [59.424848648447316, 24.808368086814884],
          [59.42484591781594, 24.808282256126407],
        ],
      },
      reception: {
        phone: "9005555",
      },
    },
    {
      id: 3,
      locationId: 1,
      status: "operational",
      address: "7 Brentwood Terrace",
      zipcode: "HMR",
      latLng: {
        positions: [
          [59.42494770754814, 24.808073043823246],
          [59.425062225836136, 24.808035492897037],
          [59.42510039851272, 24.808593392372135],
          [59.42518219696041, 24.808577299118046],
          [59.42518219696041, 24.808550477027897],
          [59.425291261249896, 24.808523654937744],
          [59.42528308144036, 24.808378815650943],
          [59.42539959859378, 24.80835199356079],
          [59.42541668474834, 24.808604121208194],
          [59.425304894261366, 24.808636307716373],
          [59.425304894261366, 24.808652400970463],
          [59.42499133360831, 24.80872213840485],
        ],
      },
      reception: {
        phone: "9005555",
      },
    },
  ],
  entity: EMPTY_BUILIDNG,
  currentEntities: [],
};

export const buildingSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    selectBuilding: (state, action: PayloadAction<number>) => {
      state.entity =
        state.entities.find(building => building.id === action.payload) || initialState.entity;
    },
    getBuildingsByLocationId: (state, action: PayloadAction<number>) => {
      state.currentEntities = state.entities.filter(
        building => building.locationId === action.payload
      );
    },
  },
});

export const buildingReducer = buildingSlice.reducer;
export const { selectBuilding, getBuildingsByLocationId } = buildingSlice.actions;
