import ApiServiceUriList from "../data/ApiServiceUriList.data";
import { AxiosClient } from "../common/AxiosClient";
import type { HttpClient } from "../common/HttpClient";

class ImageService {
  constructor(private httpClient: HttpClient) {}

  public async uploadImagePublish(image: File[], uuid: string) {
    const formData = new FormData();
    formData.append("file", image[0]);

    const { data }: { data: any } = await this.httpClient.put(
      `${ApiServiceUriList.Image.create}/${uuid}`,
      formData
    );

    return data;
  }

  public async uploadImagesProduct(images: File[], uuid: string) {
    const formData = new FormData();

    images.forEach(image => {
      formData.append('files', image);
    });

    const { data }: { data: any } = await this.httpClient.put(
      `${ApiServiceUriList.Image.createMany}/${uuid}`,
      formData,
    );

    return data;
  }
}

const httpClient = new AxiosClient({
  baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
});

export const imageService = new ImageService(httpClient);
