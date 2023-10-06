export interface Product {
  id: number,
  name: string,
  description: string,
  status: number,
  createdDate: Date,

}

export interface ProductDetail {

}

export interface ProductBasic {
  id: number,
  name: string,
  description: string | null,
  status?: number | null,
  createdDate: Date,
  brand?: string | null,
  price: number,
  offPrice?: number | null,
  thumbnail: string
}