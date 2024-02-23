<template>
  <div class="container mx-auto pt-10">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-7">
        <h3 class="text-xl font-medium ">Giỏ hàng</h3>
        <CartItem v-for="product in cartStore.listProduct" :key="product.quantityId" :product="product" />
      </div>
      <div class="col-span-12 md:col-span-5">
        <h3 class="text-xl font-medium ">Thanh toán</h3>
        <button type="button" class="btn-primary" @click="hanldeSubmitOrder">Thanh toán</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductDetail } from '~/types';

const cartStore = useCartStore();
cartStore.getProductsInCart();

function hanldeSubmitOrder() {
  console.log(cartStore.listProduct);
}
</script>

<style scoped>

</style>