import { defineStore } from "pinia";
import { IResponse, CartItemDetail, CartItemRequest, CartItemBasic } from "~/types/index";
import { useLocalStorage } from "@vueuse/core"


export type cartType = {
  cartItemDetails: CartItemDetail[] | [],
  cartItemLocals: CartItemRequest[]
};
const isAuthUser = false;

export const useCartStore = defineStore({
  id: "cartStore",
  state: () => ({
    cartItemDetails: [],
    cartItemLocals: []
  } as cartType ),
  getters: {
    countProducts: (state) => {
      if (state.cartItemLocals.length > 0) {
        const totalProducts = state.cartItemLocals.reduce((total, currentProduct) => {
          return total + currentProduct.quantity;
        }, 0);
        return totalProducts;
      } else {
        return 0;
      }
    }
  },
  actions: {
    async getProductsBasicInCart() {
      if (isAuthUser) {
        //
      } else {
        this.cartItemLocals = useLocalStorage<CartItemRequest[]>("cart_order", []).value;
      }
    },
    async getCartItemsFromLocal() {
      if (this.cartItemLocals.length == 0) {
        await this.getProductsBasicInCart();
      }
      if (this.cartItemLocals.length > 0) {
        const response:IResponse<CartItemDetail[]> = await $fetch("carts/items", {
          method: 'POST',
          body: this.cartItemLocals
        });
        this.cartItemDetails = response.output
      }
      // return this.listProductDetail;
    },
    async getAuthCartItems() {
      
    },
    async addProductToCart(qtyId: number) {
      let productIsExist = false;
      for(let i=0; i<this.cartItemLocals.length; i++) {
        if (this.cartItemLocals[i].detailId == qtyId) {
          this.cartItemLocals[i].quantity++;
          productIsExist = true;
          break;
        }
      }
      if (!productIsExist) {
        const newProductDetailV1: CartItemRequest = {
          detailId: qtyId,
          quantity: 1,
        }
        this.cartItemLocals.unshift(newProductDetailV1);
      }
    },
    async updateDateQuantyProduct(detailId: number, quantity: number) {
      if (isAuthUser) {
        //call api
      } else {
        const response:IResponse<CartItemBasic> = await $fetch("carts/update-item", {
          method: 'POST',
          body: {
            detailId: detailId,
            quantity: quantity
          }
        });
        for(let i=0; i<this.cartItemDetails.length; i++) {
          let product = this.cartItemDetails[i];
          if (product.detailId == response.output.detailId) {
            product.quantity = response.output.quantity;
            product.totalPrice = response.output.totalPrice;
            product.totalOldPrice = response.output.totalOldPrice;
            break;
          }
        };
        for (let i = 0; i < this.cartItemLocals.length; i++) {
          const product = this.cartItemLocals[i];
          if (product.detailId == response.output.detailId) {
            product.quantity = response.output.quantity;
          }
        }
        // this.saveToLocalStorage();
      }
    },
    async removeProductInCart(qtyId: number) {
      const index = this.cartItemDetails.findIndex(product => product.detailId === qtyId);
      this.cartItemDetails.splice(index, 1);
      this.cartItemLocals.splice(index, 1);
    },
    saveToLocalStorage() {
      localStorage.setItem("cart_order", JSON.stringify(this.cartItemLocals))
    },
  }
})