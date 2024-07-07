import { defineStore } from "pinia";
import { ProductBasic, IResponse, Product, Category } from "~/types/index";

export const useProductStore = defineStore({
  id: "productStore",
  state: () => ({

  }),
  actions: {
    async getTopNewProduct(pageSize: number = 4): Promise<IResponse<any>> {
      const response:IResponse<any> = await $fetch("products/list", {
        params: {
          pageSize: pageSize,
          key: "createdDate",
          orderBy: "desc"
        }
      });
      return response;
    },
    async getProductBySlug(slug: string) {
      const response:IResponse<Product> = await $fetch("products/"+slug);
      return response;
    },
    async filterProduct (
      name: string,
      categories: string[],
      brandNames: string[],
      colors: string[],
      genders: string[],
      sale: boolean,
      page?: number, pageSize?: number,
      key?: string, orderBy?: string
    ): Promise<ProductBasic[]> {
      const response:IResponse<ProductBasic[]> = await $fetch("products/list", {
        params: {
          name,
          categories,
          brandNames,
          colors,
          genders,
          sale,
          page,
          pageSize,
          key,
          orderBy
        }
      });
      return response.output;
    }
  }
})