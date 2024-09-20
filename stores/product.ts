import { defineStore } from "pinia";
import { ProductBasic, IResponse, Product, Category, IPage } from "~/types/index";

export const useProductStore = defineStore({
  id: "productStore",
  state: () => ({

  }),
  actions: {
    async getTopNewProduct(pageSize: number = 4): Promise<IPage<ProductBasic[]>> {
      const response:IResponse<IPage<ProductBasic[]>> = await $fetch("products", {
        params: {
          pageSize: pageSize,
          key: "createdDate",
          orderBy: "desc"
        }
      });
      return response.output;
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
      key?: string | null, orderBy?: string
    ): Promise<IPage<ProductBasic[]>> {
      const response:IResponse<IPage<ProductBasic[]>> = await $fetch("products", {
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