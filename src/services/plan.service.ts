import ApiServiceUriList from "../data/ApiServiceUriList.data";
import { AxiosClient } from "../common/AxiosClient";
import type { HttpClient } from "../common/HttpClient";
import { PlanRequest } from "../common/response/plan.response";


class PlanService {
  constructor(private httpClient: HttpClient) {}

  public async getPlanActive(): Promise<PlanRequest> {
    const { data }: { data: PlanRequest } = await this.httpClient.get(
      `${ApiServiceUriList.Plan.getPlan}`
    );
    return data;
  }

}

const httpClient = new AxiosClient({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const planService = new PlanService(httpClient);
