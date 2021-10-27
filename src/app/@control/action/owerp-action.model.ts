export interface OwerpActionModel {
  name: string;
  label?: string;
  icon?: string;
  status?: string;
  execute: (data: any | any[]) => void;
  mode?: string;
  visible?: (data: any) => boolean;
}
