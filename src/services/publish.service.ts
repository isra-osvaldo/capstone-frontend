import ApiServiceUriList from "../data/ApiServiceUriList.data";
import { AxiosClient } from "../common/AxiosClient";
import type { HttpClient } from "../common/HttpClient";
import {
  PublishQuery,
  PublishRequest,
} from "../common/request/publish.request";
import { Publish, ResponsePublish } from "../common/response/publish.response";

class PublishService {
  constructor(private httpClient: HttpClient) {}

  public async getAllPublish(query: PublishQuery): Promise<ResponsePublish> {
    const { page = 1, limit = 10, search = '', category = '' } = query;

    const { data }: { data: ResponsePublish } = await this.httpClient.get(
      `${ApiServiceUriList.Publish.getAll}?page=${page}&limit=${limit}&search=${search}&category=${category}`
    );

    return data;
  }

  public async getPublishByUser(uuid_user: string): Promise<ResponsePublish> {
    const { data }: { data: ResponsePublish } = await this.httpClient.get(
      `${ApiServiceUriList.Publish.getOneByUser}/${uuid_user}`
    );
    return data;
  }

  public async getTopPublish(): Promise<Publish[]> {
    const { data }: { data: Publish[] } = await this.httpClient.get(
      `${ApiServiceUriList.Publish.getTop}`
    );
    return data;
  }

  public async getRandomPublishByUser(uuid_user: string): Promise<Publish[]> {
    const { data }: { data: Publish[] } = await this.httpClient.get(
      `${ApiServiceUriList.Publish.getOneByUserRandom}/${uuid_user}`
    );
    return data;
  }

  public async createPublish(publish: PublishRequest) {
    const { data }: { data: Publish } = await this.httpClient.post(
      `${ApiServiceUriList.Publish.create}`,
      publish
    );
    return data;
  }
}

const httpClient = new AxiosClient({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const publishService = new PublishService(httpClient);
