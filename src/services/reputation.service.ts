import ApiServiceUriList from "../data/ApiServiceUriList.data";
import { AxiosClient } from "../common/AxiosClient";
import type { HttpClient } from "../common/HttpClient";
import { GetOneReputationResponse } from "../common/response/reputation.response";

class ReputationService {
  constructor(private httpClient: HttpClient) {}

  public async getOne(uuid_user: string): Promise<GetOneReputationResponse> {
    const { data } = await this.httpClient.get(
      `${ApiServiceUriList.Reputation.getOne}/${uuid_user}`
    );
    return data;
  }

  
}

const httpClient = new AxiosClient({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const reputationService = new ReputationService(httpClient);
