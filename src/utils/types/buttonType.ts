export type SortingButtonProps = {
  onSetClickInside?: any;
  onHiddenInside: boolean;
  onHiddenOutside: boolean;
  onTitleSort: string;
};

export type TaskDropDownButtonProps = {
  onSetToggle: any;
  onSetFocus?: any;
  onFocus?: any;
  onHidden?: boolean;
};

export type AddTaskDropDownButtonProps = {
  onSetToggle?: any;
  init: string;
};

export type DoneTaskButtonProps = {
  onSetToggle: any;
  onHidden?: boolean;
};

export type BackButtonProps = {
  onRoute: string;
  title: string;
};

export type RegulerButtonProps = {
  onSetAction?: any;
  title: string;
  onDisable?: boolean;
};

export type SaveInputProfileButtonProps = {
  onSetAction?: any;
  onDisable: any;
  onLoading?: boolean;
};

export type SaveImageProfileButtonProps = {
  onSetAction: any;
  onDisable?: boolean;
  onLoading?: boolean;
};
