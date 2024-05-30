import ApiServiceUriList from "../data/ApiServiceUriList.data";
import { AxiosClient } from "../common/AxiosClient";
import type { HttpClient } from "../common/HttpClient";
import { GetOneFavoriteResponse } from "../common/response/favorite.response";
import { Favorite } from "../common/interfaces/favorite.interface";

class FavoriteService {
  constructor(private httpClient: HttpClient) {}

  public async getFavorite(
    uuid_product: string
  ): Promise<GetOneFavoriteResponse> {
    const { data }: { data: GetOneFavoriteResponse } =
      await this.httpClient.get(
        `${ApiServiceUriList.Favorite.getOne}/${uuid_product}`
      );
    return data;
  }

  public async getAllFavorite(): Promise<Favorite[]> {
    const { data }: { data: Favorite[] } = await this.httpClient.get(
      `${ApiServiceUriList.Favorite.getAll}`
    );
    return data;
  }

  public async createFavorite(uuid_product: string): Promise<Favorite> {
    const { data }: { data: Favorite } = await this.httpClient.post(
      `${ApiServiceUriList.Favorite.create}`,
      {
        uuid_product,
      }
    );
    return data;
  }

  public async deleteFavorite(uuid: string): Promise<Favorite> {
    const { data }: { data: Favorite } = await this.httpClient.delete(
      `${ApiServiceUriList.Favorite.delete}/${uuid}`
    );
    return data;
  }
}

const httpClient = new AxiosClient({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const favoriteService = new FavoriteService(httpClient);
