import { FilterOptions } from './incidentsInterface';

export interface DropdownItem {
  label: string;
  value: string;
}

export interface DropdownData {
  id: number;
  title: string;
  dropdowItems: DropdownItem[];
}

export type Response =
  | { success: true; data: any }
  | { success: false; error: string };

export type ButtonVariant =
  | 'primary'
  | 'danger'
  | 'link'
  | 'warning'
  | 'success';

export type ColorVariant =
  | 'muted'
  | 'muted35'
  | 'danger'
  | 'primary'
  | 'default'
  | 'success'
  | 'text'
  | 'warning'
  | 'warningLight';

export type variant = 'success' | 'danger' | 'primary' | 'warning';

export type priority = 'Low' | 'High' | 'Urgent' | 'Medium';

export type RoleType = 'Admin' | 'Manager' | 'User' | 'Owner' | 'Employee';
