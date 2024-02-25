<template>
  <div class="container mx-auto pt-10">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-7">
        <h3 class="text-xl font-medium ">Giỏ hàng</h3>
        <Suspense>
          <template #default>
            <CartList />
          </template>
          <template #fallback>
            <CartItemSkeleton />
          </template>
        </Suspense>
      </div>
      <div class="col-span-12 lg:col-span-5">
        <h3 class="text-xl font-medium mb-6">Thanh toán</h3>
        <div class="flex justify-between text-gray-800 font-medium mb-3">
          <p>Tổng tiền hàng</p>
          <p class="ml-2">{{ formatPrice(subtotal) }}</p>
        </div>
        <div class="flex justify-between text-gray-800 font-medium mb-3">
          <p>Phí vận chuyển </p>
          <p v-if="subtotal > totalPriceForFreeDelevery" class="ml-2 text-primary-600 font-semibold">Free</p>
          <p v-else class="ml-2">{{ formatPrice(deliveryFee) }}</p>
        </div>

        <div class="flex justify-between text-gray-800 font-medium mb-3 mt-5 py-4 border-t border-b border-gray-300">
          <p>Tổng thanh toán </p>
          <p class="ml-2">{{ formatPrice(total) }}</p>
        </div>
        <div class="pt-5 pb-3">
          <button type="button" class="btn-primary" @click="hanldeSubmitOrder">Thanh toán</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductDetail } from '~/types';
import { formatPrice } from "@/utils"

const cartStore = useCartStore();
// const isLoading = ref(true);
// await cartStore.getProductsDetailOrdered()
// isLoading.value = false;
const deliveryFee: Ref<number> = ref(50000);
const totalPriceForFreeDelevery = 2000000;

const subtotal = computed(() => {
  return cartStore.listProductDetail.reduce((totalPrice, currentProduct) => {
    return totalPrice + currentProduct.totalPrice;
  }, 0)
})

const total = computed(() => {
  const deleveryFeeFinal = subtotal.value > totalPriceForFreeDelevery ? 0 : deliveryFee.value;
  return subtotal.value + deleveryFeeFinal;
})

function hanldeSubmitOrder() {
  console.log(cartStore.listProductDetail);
}
</script>

<style scoped>

</style>