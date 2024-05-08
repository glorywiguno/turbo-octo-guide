export interface IOption {
  key: string;
  value: string;
  label: string;
}

export interface IRadioGroupProps {
  options: IOption[]
  optionGroupName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (...argrs: any[]) => void;
}
