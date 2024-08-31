<template>
  <div class="container mx-auto pt-10">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 lg:col-span-7">
        <h3 class="text-xl font-medium ">Giỏ hàng</h3>
        <Suspense>
          <template #default>
            <CartList :cart-items="cartStore.cartItemDetails" />
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
          <p class="ml-2">{{ formatPrice(cartStore.totalPriceCartItems) }}</p>
        </div>
        <!-- <div class="flex justify-between text-gray-800 font-medium mb-3">
          <p>Phí vận chuyển </p>
          <p v-if="subtotal > totalPriceForFreeDelevery" class="ml-2 text-primary-600 font-semibold">Free</p>
          <p v-else class="ml-2">{{ formatPrice(deliveryFee) }}</p>
        </div> -->

        <!-- <div class="flex justify-between text-gray-800 font-medium mb-3 mt-5 py-4 border-t border-b border-gray-300">
          <p>Tạm tính </p>
          <p class="ml-2">{{ formatPrice(total) }}</p>
        </div> -->
        <div class="pt-5 pb-3">
          <button type="button" class="btn-primary" @click="hanldeSubmitOrder">Đặt hàng</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatPrice } from "@/utils"

const cartStore = useCartStore();
const authStore = useAuthStore();
const {isAuthenticated} = storeToRefs(authStore);

if (isAuthenticated.value) {
  await useAsyncData("get-cartItems", () => cartStore.getAuthCartItems());
}
onMounted(async () => {
  if (!isAuthenticated.value) {
    await cartStore.getCartItemsFromLocal();
  }
})

function hanldeSubmitOrder() {
  navigateTo("/checkout")
}
</script>

<style scoped>

</style>