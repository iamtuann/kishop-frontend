<template>
  <div class="container mx-auto pt-10">
    <template v-if="pending">
      <CartItemSkeleton v-for="number in 2" :key="number" />
    </template>
    <template v-if="!pending && cartStore.cartItemDetails.length == 0">
      <div class="flex flex-col items-center">
        <img src="~/assets/images/empty-cart.png" alt="không có sản phẩm trong giỏ hàng">
        <p class="font-medium text-2xl">Không có sản phẩm trong giỏ hàng</p>
        <NuxtLink class="btn-small mt-4 px-6 py-3 text-base" to="/">Mua sắm ngay</NuxtLink>
      </div>
    </template>
    <div v-if="!pending && cartStore.cartItemDetails.length > 0" class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-7">
        <h3 class="text-xl font-medium ">Giỏ hàng</h3>
        <CartItem
          v-for="product in cartStore.cartItemDetails"
          :key="product.detailId"
          :product="product"
          hide-quantity  
        />
      </div>
      <div class="col-span-12 lg:col-span-5">
        <h3 class="text-xl font-medium mb-6">Thanh toán</h3>
        <div class="flex justify-between text-gray-800 font-medium mb-3">
          <p>Tổng tiền hàng</p>
          <p class="ml-2">{{ formatPrice(cartStore.totalPriceCartItems) }}</p>
        </div>
        <div class="pt-5 pb-3">
          <button type="button" class="btn-primary" @click="hanldeSubmitOrder">Đặt hàng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from "@/utils"
import { useCustomFetchData } from "~/composables";
import { ItemDetail } from "~/types";

const cartStore = useCartStore();

const { pending } = await useCustomFetchData<ItemDetail[]>(cartStore.getCartItemDetailsAuth, cartStore.getCartItemDetailsLocal);

function hanldeSubmitOrder() {
  navigateTo("/checkout")
}
</script>

<style scoped>

</style>