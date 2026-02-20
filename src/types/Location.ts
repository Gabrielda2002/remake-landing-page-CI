export interface Department  {
  id: number;
  name: string;
}

export interface Municipality {
  id: number;
  name: string;
  departmentId?: number;
}