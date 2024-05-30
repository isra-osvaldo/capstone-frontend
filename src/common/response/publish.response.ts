export interface ResponsePublish {
  docs: Publish[];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: any;
  nextPage: number;
}

export interface Publish {
  _id: string;
  uuid: string;
  uuid_product: string;
  uuid_user: string;
  category: string;
  name: string;
  price: number;
  image: string;
  publish_description: string;
  state: boolean;
  reputationId: ReputationId
  created_at: string;
  updated_at: string;
  id: string;
}

export interface ReputationId {
  _id: string;
  uuid: string;
  uuid_user: string;
  total_calification: number;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface PublishWithObjectReputation {
  _id: string;
  uuid: string;
  uuid_product: string;
  uuid_user: string;
  category: string;
  name: string;
  price: number;
  image: string;
  publish_description: string;
  state: boolean;
  reputationId: ReputationId;
  created_at: string;
  updated_at: string;
  id: string;
}
