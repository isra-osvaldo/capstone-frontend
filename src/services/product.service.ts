import ApiServiceUriList from "../data/ApiServiceUriList.data";
import { AxiosClient } from "../common/AxiosClient";
import type { HttpClient } from "../common/HttpClient";
import { ProductType } from "../schema/product.schema";
import { ProductResponse } from "../common/interfaces/product.response";

class ProductService {
  constructor(private httpClient: HttpClient) {}

  public async getProduct(uuid: string): Promise<ProductResponse> {
    const { data }: { data: ProductResponse } = await this.httpClient.get(
      `${ApiServiceUriList.Product.getOne}/${uuid}`
    );
    return data;
  }

  public async createProduct(product: Omit<ProductType, "image">) {
    const { data }: { data: ProductResponse } = await this.httpClient.post(
      `${ApiServiceUriList.Product.create}`,
      product
    );
    return data;
  }
}

const httpClient = new AxiosClient({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const productService = new ProductService(httpClient);
