export interface StateDto {
  id: number;
  name: string;
  code: string;
}

export interface UpdateStateRequest {
  states: StateDto[];
}