import ApiServiceUriList from "../data/ApiServiceUriList.data";
import { AxiosClient } from "../common/AxiosClient";
import type { HttpClient } from "../common/HttpClient";
import { ExchangeCreateRequest } from "../common/request/exchange.request";
import { Exchange } from "../common/interfaces/exchange.interface";

class ExchangeService {
  constructor(private httpClient: HttpClient) {}

  public async createExchange(
    payload: ExchangeCreateRequest
  ): Promise<Exchange> {
    const { data }: { data: Exchange } = await this.httpClient.post(
      `${ApiServiceUriList.Exchange.create}`,
      payload
    );
    return data;
  }

  public async getExchangeWant(
    status?: string,
    uuid_product_offer?: string
  ): Promise<Exchange[]> {
    const params = new URLSearchParams();
    if (status) {
      params.append("status", status);
    }
    if (uuid_product_offer) {
      params.append("uuid_product_offer", uuid_product_offer);
    }

    const { data }: { data: Exchange[] } = await this.httpClient.get(
      `${ApiServiceUriList.Exchange.getExchangeWant}`,
      {
        params,
      }
    );

    return data;
  }

  public async getExchangeRequest(
    status?: string,
    uuid_product_publish?: string
  ): Promise<Exchange[]> {
    const params = new URLSearchParams();
    if (status) {
      params.append("status", status);
    }
    if (uuid_product_publish) {
      params.append("uuid_product_publish", uuid_product_publish);
    }

    const { data }: { data: Exchange[] } = await this.httpClient.get(
      `${ApiServiceUriList.Exchange.getExchangeRequest}`,
      {
        params,
      }
    );

    return data;
  }

  public async getMatches(): Promise<Exchange[]> {
    const { data }: { data: Exchange[] } = await this.httpClient.get(
      `${ApiServiceUriList.Exchange.getMatches}`
    );

    return data;
  }

  public async patchStatus(uuid: string, status: string): Promise<Exchange[]> {
    const { data }: { data: Exchange[] } = await this.httpClient.patch(
      `${ApiServiceUriList.Exchange.patchStatus}/${uuid}`,
      {
        status,
      }
    );

    return data;
  }
}

const httpClient = new AxiosClient({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const exchangeService = new ExchangeService(httpClient);
