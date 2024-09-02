import { defineStore } from "pinia";
import { AdressResponse, AdressData, CartItemDetail, IResponse } from "~/types";
import { OrderPaymentInfo } from "~/types/Order";
import { externalFetch } from "~/utils";

export const useCheckoutStore = defineStore({
  id: "checkoutStore",
  state: () => ({

  }),
  actions: {
    async getProvinces():Promise<AdressData[]> {
      const response: AdressResponse = await externalFetch("https://esgoo.net/api-tinhthanh/1/0.htm");
      return response.data;
    },
    async getDistricts(provinceId: number | string | string | undefined):Promise<AdressData[]> {
      if (!provinceId) return [];

      const response: AdressResponse = await externalFetch(`https://esgoo.net/api-tinhthanh/2/${provinceId}.htm`);
      return response.data;
    },
    async getWards(districtId: number | string | string | undefined):Promise<AdressData[]> {
      if (!districtId) return [];

      const response: AdressResponse = await externalFetch(`https://esgoo.net/api-tinhthanh/3/${districtId}.htm`);
      return response.data;
    },
    async getPaymentInfo():Promise<OrderPaymentInfo> {
      const response: IResponse<OrderPaymentInfo> = await $fetch("orders/payment-info");
      return response.output;
    }
  }
})