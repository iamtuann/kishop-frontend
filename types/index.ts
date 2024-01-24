export interface Product {
  id: number,
  name: string,
  slug: string,
  description: string,
  status: number,
  createdDate: Date,
  updatedDate: Date,
  brand: Brand,
  productDetails: ProductDetail[] | [],
  productPreviewId: number
}

export interface ProductDetail {
  id: number,
  name: string,
  price: number,
  offPrice: number,
  status: number,
  previewImage: string,
  imageUrls: string[],
  productQuantities: ProductQuantity[],
}

export interface ProductQuantity {
  id: number,
  size: Size,
  quantity: number
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
  thumbnail: string,
  slug: string
}

export interface Brand {
  id: number,
  name: string,
  origin: string,
  description: string
}

export interface Color {
  id: number,
  name: string,
  engName: string,
  description?: string
  code: string
}

export interface Size {
  id?: number,
  name: string,
  description?: string
}

export interface IResponse<T> {
  statusCode: number,
  message: string,
  output: T,
  error: string
}