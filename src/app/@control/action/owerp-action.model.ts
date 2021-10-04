export interface OwerpActionModel {
 name: string;
 label: string;
 icon?: string;
 status?: string;
 execute: () => void;
}
