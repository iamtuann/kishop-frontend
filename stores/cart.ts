import { defineStore } from "pinia";
import { IResponse, ProductDetail } from "~/types/index";
import { useLocalStorage } from "@vueuse/core"


export type cartType = {
  listProduct: ProductDetail[] | []
};
const isAuthUser = false;

export const useCartStore = defineStore({
  id: "cartStore",
  state: () => ({
    listProduct: [],
  } as cartType ),
  actions: {
    getProductsInCart() {
      if (isAuthUser) {
        //
      } else {
        this.listProduct = useLocalStorage<ProductDetail[]>("cart_order", []).value;
      }
    },
    updateDateQuantyProduct(qtyId: number, quantity: number) {
      if (isAuthUser) {
        //call api
      } else {
        for(let i=0; i<this.listProduct.length; i++) {
          if (this.listProduct[i].quantityId == qtyId) {
            this.listProduct[i].quantity = quantity;
          }
        };
        this.saveToLocalStorage();
      }
    },
    removeProductInCart(qtyId: number) {
      
    },
    saveToLocalStorage() {
      localStorage.setItem("cart_order", JSON.stringify(this.listProduct))
    },
  }
})