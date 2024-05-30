import axios, {
  AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse
} from 'axios'
import { HttpClient } from './HttpClient'
import type { IHttpClient } from './interfaces/HttpClient.interface'
import keycloak from '../security/keycloak-config'

export class AxiosClient extends HttpClient {
  private readonly http: AxiosInstance
  private readonly baseURL: string

  constructor({ baseURL }: IHttpClient) {
    super()

    this.baseURL = baseURL

    this.http = axios.create({
      baseURL: this.baseURL
    })

    this.configuration()
  }

  private configuration() {
    this.http.interceptors.request.use(
      async (request: any) => {


        // if (request.url === 'api/publish' && request.method === 'get') return request

        // si el token vence, se refresca
        // if (keycloak.isTokenExpired()) {
        //   await keycloak.updateToken(0);
        // }
        
        request.headers = { ...request.headers, Authorization: `Bearer ${keycloak.token}` }

        return request
      },
      async (err: AxiosError) => {
        return Promise.reject(err)
      }
    )

    this.http.interceptors.response.use(
      async (request: AxiosResponse) => {

        return request
      },
      async (err: any) => {

        return Promise.reject(err)
      }
    )
  }

  public async post(
    url: string,
    payload?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return await this.http({
      method: 'post',
      url: url,
      data: payload,
      ...config
    })
  }

  public async get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.http({
      method: 'get',
      url: url,
      ...config
    })
  }

  public async put(
    url: string,
    payload: object,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return await this.http({
      method: 'put',
      url: url,
      data: payload,
      ...config
    })
  }

  public async patch(
    url: string,
    payload: object,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return await this.http({
      method: 'patch',
      url: url,
      data: payload,
      ...config
    })
  }

  public async delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse> {
    return await this.http({
      method: 'delete',
      url: url,
      ...config
    })
  }
}
