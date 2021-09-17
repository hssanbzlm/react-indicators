export interface Ranges {
  startDate?: Date | undefined;
  endDate?: Date | undefined;
  key?: string | undefined;
}

export interface Area {
  AreaName: string;
}
export interface Professions {
  ProfessionName: string;
}
export interface Data {
  Date: string;
  Colaborator: string;
  Areas: string;
  Working_Hours: string;
  Professions: string;
}
export interface GraphData {
  Colaborator: string;
  Working_Hours: number;
}

export interface PieData {
  Area: string;
  Working_Hours: number;
}
