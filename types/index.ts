export interface Product {
  id: number,
  name: string,
  slug: string,
  description: string,
  status: number,
  createdDate: Date,
  updatedDate: Date,
  brand: Brand,
  productVariants: ProductVariant[] | [],
  productPreviewId: number
}

export interface ProductVariant {
  id: number,
  productName: string,
  name: string,
  color: string,
  price: number,
  oldPrice: number,
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
  variantName?: string,
  variantId?: string,
  description: string | null,
  status?: number | null,
  createdDate: Date,
  brand?: string | null,
  price: number,
  oldPrice: number,
  thumbnail: string,
  slug: string,
  color: string | null
}

export interface ProductDetail {
  id: number,
  variantId: number,
  quantityId: number,
  name: string,
  variantName: string,
  slug: string
  color: string,
  size: string,
  status: number,
  brand: string,
  thumbnail: string,
  price: number,
  oldPrice: number,
  quantity: number,
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

export interface Category {
  id?: number,
  name: string,
  slug: string,
  description?: string
}

export interface IResponse<T> {
  statusCode: number,
  message: string,
  output: T,
  error: string
}