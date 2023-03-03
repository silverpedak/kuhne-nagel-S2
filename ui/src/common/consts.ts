import { AssetUi } from "@/types/ui/common-ui";
import { SelectOption } from "@/types/ui/common-ui";

export const PERMISSIONS_NONE = "PERMISSIONS_NONE";
export const AUTHENTICATED = "AUTHENTICATED";

export const NO_FILTER = "";
export const SELECT_ALL = { value: NO_FILTER, label: "ALL" };
export const SELECT_ALL_IDS = (ids: number[]) => {
  return { value: `${ids}`, label: "ALL" };
};

export const DATE_FILTER_FORMAT = "DD/MM/YYYY";

export const TYPE_OPTIONS: SelectOption[] = [
  { value: "1", label: "Machine" },
  { value: "2", label: "Room" },
  { value: "3", label: "Asset" },
];

export const EMPTY_ASSET_UI: AssetUi = {
  name: "",
  type: TYPE_OPTIONS[0],
};

export const RED_LIGHT = "#fd4756";
export const GREEN_LIGTH = "#07d198";
export const YELLOW_LIGHT = "#fc866b";

export enum AssetType {
  Machine = "machine",
  Asset = "asset",
  Room = "room",
}

export enum AssetState {
  Normal = "normal",
  Error = "error",
  Warning = "warning",
  Operational = "operational",
}

export enum AssetStatus {
  Idle = "idle",
  Stopped = "stopped",
  Running = "running",
}

export enum AlertType {
  Error = "error",
  Warning = "warning",
}
