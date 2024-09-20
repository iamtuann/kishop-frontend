import { defineStore } from "pinia";
import { IResponse, ItemDetail, CartItemRequest, ItemBasic } from "~/types/index";
import { useLocalStorage } from "@vueuse/core"


export type cartType = {
  cartItemDetails: ItemDetail[] | [],
  cartItemLocals: CartItemRequest[],
  cartItemBasicsAuth: ItemBasic[],
  totalCartItemsAuth: number
};

export const useCartStore = defineStore({
  id: "cartStore",
  state: () => ({
    cartItemDetails: [],
    cartItemLocals: [],
    cartItemBasicsAuth: [],
    totalCartItemsAuth: 0
  } as cartType ),
  getters: {
    totalCartItemsLocal: (state) => {
      if (state.cartItemLocals.length > 0) {
        const totalProducts = state.cartItemLocals.reduce((total, currentProduct) => {
          return total + currentProduct.quantity;
        }, 0);
        return totalProducts;
      } else {
        return 0;
      }
    },
    totalPriceCartItems: (state) => {
      if (state.cartItemDetails?.length > 0) {
        return state.cartItemDetails.reduce((totalPrice, currentProduct) => {
          return totalPrice + currentProduct.totalPrice;
        }, 0)
      } else {
        return 0;
      }
    }
  },
  actions: {
    getCartItemsFromLocals() {
      this.cartItemLocals = useLocalStorage<CartItemRequest[]>("cart_order", []).value;
    },
    async getCartItemDetailsLocal() {
      this.getCartItemsFromLocals();
      if (this.cartItemLocals.length > 0) {
        const response:IResponse<ItemDetail[]> = await $fetch("carts/items", {
          method: 'POST',
          body: this.cartItemLocals
        });
        this.cartItemDetails = response.output
      }
    },
    async countCartItemsAuth() {
      const response: IResponse<number> = await $fetch("carts/count-items");
      this.totalCartItemsAuth = response.output;
      return response.output;
    },
    async getCartItemDetailsAuth() {
      const response: IResponse<ItemDetail[]> = await $fetch("carts/items");
      this.cartItemDetails = response.output;
    },
    async addProductToCart(detailId: number) {
      if (useAuthStore().isAuthenticated) {
        const response:IResponse<ItemBasic> = await $fetch("carts/update-item", {
          method: 'POST',
          body: {
            detailId: detailId
          }
        });
        await this.countCartItemsAuth();
      } else {
        const cartItem = this.cartItemLocals.find(item => item.detailId === detailId);
        if (cartItem) {
          cartItem.quantity++;
        } else {
          const newCartItem: CartItemRequest = {
            detailId: detailId,
            quantity: 1,
          }
          this.cartItemLocals.unshift(newCartItem);
        }
        this.saveToLocalStorage();
      }
    },
    async updateDateCartItem(detailId: number, quantity: number) {
      const response:IResponse<ItemBasic> = await $fetch("carts/update-item", {
        method: 'POST',
        body: {
          detailId: detailId,
          quantity: quantity
        }
      });
      //update info cart items detail
      for(let i=0; i<this.cartItemDetails.length; i++) {
        let product = this.cartItemDetails[i];
        if (product.detailId == response.output.detailId) {
          product.quantity = response.output.quantity;
          product.totalPrice = response.output.totalPrice;
          product.totalOldPrice = response.output.totalOldPrice;
          break;
        }
      };
      if (!useAuthStore().isAuthenticated) {
        //update cart items local
        for (let i = 0; i < this.cartItemLocals.length; i++) {
          if (this.cartItemLocals[i].detailId == response.output.detailId) {
            this.cartItemLocals[i].quantity = response.output.quantity;
          }
        }
      } else {
        await this.countCartItemsAuth();
      }
    },
    async removeProductInCart(detailId: number) {
      if (useAuthStore().isAuthenticated) {
        const response:IResponse<ItemBasic> = await $fetch("carts/update-item", {
          method: 'POST',
          body: {
            detailId: detailId,
            quantity: 0
          }
        });
        await this.countCartItemsAuth();
      }
      const index = this.cartItemDetails.findIndex(product => product.detailId === detailId);
      this.cartItemDetails.splice(index, 1);
      this.cartItemLocals.splice(index, 1);
    },
    saveToLocalStorage() {
      localStorage.setItem("cart_order", JSON.stringify(this.cartItemLocals))
    },
    removeAllCartItemLocal() {
      localStorage.removeItem("cart_order");
      this.cartItemDetails = [];
      this.cartItemLocals = [];
    }
  }
})