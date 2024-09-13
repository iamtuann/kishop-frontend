import { defineStore } from "pinia";
import {
  AddressResponse,
  AddressData,
  IResponse,
  OrderPaymentInfo,
  OrderShippingInfo,
  Order
} from "~/types";
import { externalFetch } from "~/utils";

export type OrderType = {
  isCheckoutSuccess: boolean,
  orderInfo: Order,
};

export const useCheckoutStore = defineStore({
  id: "checkoutStore",
  state: () => ({
    isCheckoutSuccess: false,
    orderInfo: {}
  } as OrderType),
  actions: {
    async getProvinces():Promise<AddressData[]> {
      const response: AddressResponse = await externalFetch("https://esgoo.net/api-tinhthanh/1/0.htm");
      return response.data;
    },
    async getDistricts(provinceId: number | string | string | undefined):Promise<AddressData[]> {
      if (!provinceId) return [];

      const response: AddressResponse = await externalFetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
      return response.data;
    },
    async getWards(districtId: number | string | string | undefined):Promise<AddressData[]> {
      if (!districtId) return [];

      const response: AddressResponse = await externalFetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
      return response.data;
    },
    async getPaymentInfo():Promise<OrderPaymentInfo> {
      const response: IResponse<OrderPaymentInfo> = await $fetch("orders/payment-info");
      return response.output;
    },
    async getPaymentInfoFromCartItem():Promise<OrderPaymentInfo> {
      const cartStore = useCartStore();
      if (cartStore.cartItemLocals == null || cartStore.cartItemLocals.length == 0) {
        return {} as OrderPaymentInfo;
      }
      const response: IResponse<OrderPaymentInfo> = await $fetch("orders/payment-info", {
        method: 'POST',
        body: cartStore.cartItemLocals
      })
      return response.output;
    },
    async createOrder(shippingInfo: OrderShippingInfo): Promise<IResponse<Order>> {
      const cartStore = useCartStore();
      const authStore = useAuthStore();
      const body = authStore.isAuthenticated ? {
        shippingInfo
      } : {
        shippingInfo,
        products: cartStore.cartItemLocals
      }
      const response: IResponse<Order> = await $fetch("orders", {
        method: 'POST',
        body: body
      })
      if (response.statusCode === 200) {
        this.isCheckoutSuccess = true;
        this.orderInfo = response.output;
        if (!authStore.isAuthenticated) {
          cartStore.removeAllCartItemLocal();
        }
      }
      return response;
    }
  }
})