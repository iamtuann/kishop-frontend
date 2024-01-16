import { defineStore } from "pinia";
import { ProductBasic, IResponse, Product } from "~/types/index";

export const useProductStore = defineStore({
  id: "productStore",
  state: () => ({

  }),
  actions: {
    async getTopNewProduct(size: number = 4) {
      const response:IResponse<any> = await $fetch("products/list", {
        params: {
          size: size,
          key: "createdDate",
          orderBy: "desc"
        }
      });
      return response;
    },
    async getProductBySlug(slug: string) {
      const response:IResponse<Product> = await $fetch("products/"+slug);
      return response;
    }
  }
})