export interface CartItemRequest {
  detailId: number,
  quantity: number,
}

export interface ItemBasic {
  id: number,
  detailId: number,
  price: number,
  oldPrice: number,
  quantity: number,
  totalPrice: number,
  totalOldPrice: number
}

export interface ItemDetail extends ItemBasic {
  productId: number,
  variantId: number,
  name: string,
  variantName: string,
  slug: string,
  color: string,
  size: string,
  brand: string,
  thumbnail: string
}