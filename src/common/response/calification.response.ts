import { Exchange } from "../interfaces/exchange.interface";

export interface CalificationResponse {
  _id: string;
  uuid: string;
  uuid_user: string;
  uuid_user_calification: string;
  exchange: Exchange;
  calification: number;
  comment: string;
}
