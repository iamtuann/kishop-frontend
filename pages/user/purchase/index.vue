<template>
  <div class="flex justify-between items-center mb-4">
    <h4 class="font-medium text-lg">Lịch sử mua hàng</h4>
  </div>
  <SkeletonUserOrder v-if="pending" />
  <div v-else>
    <div v-for="order in orders" :key="order.orderCode"
      class="border border-gray-300 rounded-md overflow-hidden mb-4"
    >
      <div class="flex bg-[#f4f4f4] px-3 md:px-4 py-3">
        <p class="font-medium text-green-600">#{{ order.orderCode }}</p>
        <div class="flex-1"></div>
        <p v-if="order.orderStatus === 'CANCELED'" class="text-red-500 uppercase">{{ order.orderStatusTitle }}</p>
        <p v-else class="text-green-600 text-sm md:text-base">{{ order.orderStatusTitle }}</p>
      </div>
      <div class="px-3">
        <CartItem
          v-for="item in order.orderItemDetails"
          class="!py-3"
          :product="item"
          :key="item.id"
          hide-actions
          size="small"
        />
      </div>
      <div class="py-3 sm:py-5 px-3">
        <div class="flex justify-between flex-col-reverse md:flex-row md:gap-y-2">
          <div>
            <p class="text-sm sm:text-[15px] text-gray-500">Ngày đặt: {{ formatDate(new Date(order.orderDate)) }}</p>
            <NuxtLink :to="`/user/purchase/${order.orderCode}`" class="underline text-gray-500 hover:text-green-500">Xem chi tiết</NuxtLink>
          </div>
          <div class="flex justify-between items-center gap-x-2 h-full">
            <p>Thành tiền: </p>
            <p class="text-red-700 text-base sm:text-xl tracking-wide">{{ formatPrice(order.totalPrice) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Order } from '~/types';
import { formatPrice, formatDate } from "~/utils";

definePageMeta({
  layout: "user",
});
const authStore = useAuthStore();

const { data: orders, pending } = await useAsyncData<Order[]>("get-orders", () => authStore.getOrders());

</script>

<style scoped>

</style>