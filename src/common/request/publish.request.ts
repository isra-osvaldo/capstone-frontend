export interface PublishRequest {
  uuid_product: string;
  publish_description: string;
}

export interface PublishQuery {
  page?: number;
  limit?: number;
  search?: string;
  category?: string;
}