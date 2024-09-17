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
  detailAddress: string,
  note: string,
  paymentType: PaymentType
}

export type PaymentType = "COD" | "BANKING";

export type OrderStatus = "PENDING" | "CONFIRMED" | "SHIPPING" | "COMPLETED" | "CANCELED";

export interface Order {
  id: number | string,
  receiverName: string,
  phoneNumber: string,
  orderDate: Date,
  receiveDate?: Date,
  orderCode: string,
  orderItemDetails: ItemDetail[],
  province: string,
  district: string,
  ward: string,
  detailAddress: string,
  note: string,
  shippingFee: number,
  subTotalPrice: number,
  totalPrice: number,
  paymentType: PaymentType,
  orderStatus: OrderStatus,
  orderStatusTitle: string,
}

export interface OrderHistory {
  id: number | string,
  orderId: number | string,
  date: Date,
  title: string,
  description: string,
  orderStatus: OrderStatus,
}

export interface OrderDetail extends Order {
  orderHistories: OrderHistory[]
}