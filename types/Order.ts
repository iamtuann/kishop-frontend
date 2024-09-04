import { ItemDetail } from "./Cart";

export interface OrderPaymentInfo {
  itemDetails: ItemDetail[],
  subTotalPrice: number,
  shippingFee: number,
  totalPrice: number 
}

export interface OrderShippingInfo {
  receiverName: string,
  phoneNumber: string,
  province: string,
  district: string,
  ward: string,
  detailAdress: string,
  note: string,
  paymentType: PaymentType
}

export type PaymentType = "COD" | "BANKING"