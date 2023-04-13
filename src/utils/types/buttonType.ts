export type ButtonProps = {
  onSetToggle: any;
  onHidden?: boolean;
};

export type TaskDropDownButtonProps = {
  onSetToggle: any;
  onSetFocus?: any;
  onFocus?: any;
  onHidden?: boolean;
};

export type AddTaskDropDownButtonProps = {
  onSetToggle?: any;
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
  onAction?: any;
  onsSetAction?: any;
  title: string;
};
