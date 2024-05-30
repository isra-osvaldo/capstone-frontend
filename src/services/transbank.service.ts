import ApiServiceUriList from "../data/ApiServiceUriList.data";
import { AxiosClient } from "../common/AxiosClient";
import type { HttpClient } from "../common/HttpClient";
import { TransactionRequest } from "../common/request/plan.request";

class TransbankService {
  constructor(private httpClient: HttpClient) {}

  public async createTransaction(payload: TransactionRequest): Promise<any> {
    const { data }: { data: any } = await this.httpClient.get(
      `${ApiServiceUriList.Transbank.create}?buyOrder=${payload.buyOrder}&sessionId=${payload.sessionId}&amount=${payload.amount}&type=${payload.type} `,
    );
    return data;
  }
}

const httpClient = new AxiosClient({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const transbankService = new TransbankService(httpClient);
