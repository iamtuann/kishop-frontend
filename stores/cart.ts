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
          let product = this.listProduct[i];
          if (product.quantityId == qtyId) {
            product.quantity = quantity;
            product.total = product.quantity * product.price;
            product.totalOldPrice = product.quantity * product.oldPrice;
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