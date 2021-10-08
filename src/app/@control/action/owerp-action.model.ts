export interface OwerpActionModel {
  name: string;
  label?: string;
  icon?: string;
  status?: string;
  execute: () => void;
  mode: string;
  visible?: (data: any) => boolean;
}
