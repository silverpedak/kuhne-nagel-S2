export interface AppAction {
  type: string;
  payload: any;
}

export function typedAction<T extends string, P>(type: T, payload: P): AppAction {
  return { type, payload };
}

export const AppActionType = {
  GET_LOCATIONS: "GET_LOCATIONS",

  GET_BUILDINGS: "GET_BUILDINGS",
  SELECT_BUILDING: "SELECT_BUILDING",

  CREATE_FLOOR: "CREATE_FLOOR",
  DELETE_FLOOR: "DELETE_FLOOR",
  UPDATE_FLOOR: "UPDATE_FLOOR",
  GET_FLOORS: "GET_FLOORS",
  SELECT_FLOOR: "SELECT_FLOOR",

  GET_ROOMS: "GET_ROOMS",
  UPDATE_ROOM: "UPDATE_ROOM",
} as const;

export type AppActionType = typeof AppActionType[keyof typeof AppActionType];

Object.freeze(AppActionType);
