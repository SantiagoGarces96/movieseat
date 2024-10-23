import { IconType } from "react-icons";

export interface INavLinks {
  name: string;
  href?: string;
  icon?: IconType;
}

export interface IBadgeDashboard {
  label: string;
}

export interface IResultDataDashboard {
  src: string;
  label: string;
  href: string;
}

export interface IResultsSearchsDashboard {
  title: string;
  resultData: IResultDataDashboard[];
}

export interface IDashboardResponse {
  results: { [key: string]: string }[];
  page: number;
  totalPages: number;
  totalResults: number;
}
