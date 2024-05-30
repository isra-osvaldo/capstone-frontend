import { Publish } from "../response/publish.response";

export interface Favorite {
  _id: string;
  uuid: string;
  uuid_user: string;
  publish: Publish;
  created_at: string;
  updated_at: string;
}
