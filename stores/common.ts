import { defineStore } from "pinia";
import { Brand, Color, IResponse } from "@/types";

export const useCommonStore = defineStore({
  id: "commonStore",
  state: () => ({

  }),
  actions: {
    async getAllBrands(): Promise<Brand[]> {
      const response:IResponse<Brand[]> = await $fetch("brands/all");
      return response.output;
    },
    async getAllColors(): Promise<Color[]> {
      const response:IResponse<Color[]> = await $fetch("colors/all");
      return response.output;
    },
  }
})