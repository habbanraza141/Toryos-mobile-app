import { components } from '@EHSNavigator/types';
import { StyleSheet } from 'react-native';
import { DropdownData } from './generalInterface';

export interface FilterOptions {
  'All statuses': string;
  Departments: string;
  'Incident types': string;
  Severities: string;
  search: string;
}

export interface InjuryFilterOptions {
  Type: string;
  Classification: string;
  'Type of Loss': string;
  Department: string;
  Status: string;
  Severities: string;
  search: string;
}

export interface HeaderProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
  filterOptions: any;
  setFilterOptions: React.Dispatch<React.SetStateAction<any>>;
  styles: ReturnType<typeof StyleSheet.create>;
  handleResetFilter: () => void;
  hasActiveFilters: boolean;
  handleSelectFilterOption: (name: string, value: string) => void;
  MY_REPORTED_INCIDENTS_DROPDOWN: DropdownData[] | any;
  incidents?: components['schemas']['Incidents'][];
  onExport?: () => void;
  exportLoading?: boolean;
  fetchingForExport?: boolean;
  extra?: string
}
