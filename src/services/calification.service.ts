import ApiServiceUriList from "../data/ApiServiceUriList.data";
import { AxiosClient } from "../common/AxiosClient";
import type { HttpClient } from "../common/HttpClient";
import { CalificationResponse } from "../common/response/calification.response";
import { CalificationCreateRequest } from "../common/request/calification.request";

class CalificationService {
  constructor(private httpClient: HttpClient) {}

  public async createCalification(
    payload: CalificationCreateRequest
  ): Promise<CalificationResponse> {
    const { data }: { data: CalificationResponse } =
      await this.httpClient.post(
        `${ApiServiceUriList.Calification.create}`,
        payload
      );
    return data;
  }

  public async getCalificationByExchangeUuid(exchange_uuid: string): Promise<CalificationResponse> {
    const { data }: { data: CalificationResponse } =
      await this.httpClient.get(
        `${ApiServiceUriList.Calification.getCalificationByExchangeUuid}/${exchange_uuid}`
      );
    return data;
  }

  public async updateCalification(payload: CalificationCreateRequest, uuid: string): Promise<CalificationResponse> {
    const { data }: { data: CalificationResponse } =
      await this.httpClient.put(
        `${ApiServiceUriList.Calification.updateCalification}/${uuid}`,
        payload
      );
    return data;
  }
}

const httpClient = new AxiosClient({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const calificationService = new CalificationService(httpClient);
