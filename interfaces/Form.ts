import { HTMLInputTypeAttribute } from "react";

export interface IFormInputData {
  label: string;
  name?: string;
  type?: HTMLInputTypeAttribute | "select";
  options?: ReadonlyArray<{ opt: string; value: string }>;
  disabled?: boolean;
  autofocus?: boolean;
  currentValue?: number | string;
  required?: boolean;
}
