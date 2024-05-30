import { Publish } from "./publish.response";

export interface GetOneFavoriteResponse {
    _id: string;
    uuid: string;
    uuid_user: string;
    publish: Publish;
    created_at: string;
    updated_at: string;
}
