import { ProductResponse } from "./product.response"

export interface Exchange {
  _id: string
  uuid: string
  uuid_product_publish: ProductResponse
  uuid_user_publish: string
  uuid_product_offer: ProductResponse
  uuid_user_offer: string
  status: string
  created_at: string
  updated_at: string
}


export interface ExchangeForCalification {
  email: string
  key: number
  product: ProductResponse,
  productOffer: ProductResponse,
  status: string
  updated_at: string
  exchange_uuid: string
}