export interface PlanRequest {
  _id: string;
  uuid: string;
  uuid_user: string;
  type: string;
  amount: number;
  order: string;
  email: string;
  name_user: string;
  timestamp_start: Date;
  timestamp_end: Date;
  cant_exchange: number;
}
