import { CartItemDetail } from "./Cart";

export interface OrderPaymentInfo {
  cartItemDetails: CartItemDetail[],
  subTotalPrice: number,
  shippingFee: number,
  totalPrice: number 
}