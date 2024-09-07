import { Brand, Size } from "./Common";

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
  productDetails: ProductDetail[],
}

export interface ProductDetail {
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