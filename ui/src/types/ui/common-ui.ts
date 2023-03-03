export type AlertType = null | React.ReactNode;

export interface SelectOption {
  value: string;
  label: string;
}

export interface AssetUi {
  name: string;
  type: SelectOption;
}
