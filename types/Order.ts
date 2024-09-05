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
  receiverName: string;
  phoneNumber: string;
  orderDate: Date;
  receiveDate?: Date;
  orderCode: string;
  orderItemDetails: ItemDetail[];
  province: string;
  district: string;
  ward: string;
  detailAddress: string;
  note: string;
  shippingFee: number;
  subTotalPrice: number;
  totalPrice: number;
  paymentType: PaymentType;
  orderStatus: OrderStatus;
}