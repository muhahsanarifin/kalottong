export type SortingButtonProps = {
  setClickInside?: any;
  hiddenInside: boolean;
  hiddenOutside: boolean;
  onTitleSort: string;
};

export type TaskDropDownButtonProps = {
  setToggle: any;
  setFocus?: any;
  onFocus?: any;
  onHidden?: boolean;
};

export type AddTaskDropDownButtonProps = {
  setToggle?: () => void;
  init?: string;
  disabled?: boolean;
};

export type DoneTaskButtonProps = {
  setToggle: any;
  onHidden?: boolean;
};

export type BackButtonProps = {
  onRoute: string;
  title: string;
};

export type RegulerButtonProps = {
  setAction?: any;
  title: string;
  onDisable?: boolean;
};

export type SaveInputProfileButtonProps = {
  setAction?: any;
  onDisable: any;
  onLoading?: boolean;
};

export type SaveImageProfileButtonProps = {
  setAction: any;
  onDisable?: boolean;
  onLoading?: boolean;
};
