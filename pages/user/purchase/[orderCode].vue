<template>
  <div v-if="data">
    <div v-if="data?.orderStatus != 'CANCELED'" class="grid grid-cols-12 gap-5">
      <div class="col-span-12 md:col-span-4">
        <p class="text-xl font-medium mb-2">Địa chỉ nhận hàng</p>
        <p>{{ data?.receiverName }}</p>
        <div class="text-sm text-gray-500 mt-2">
          <p>{{ formatPhoneNumber(data.phoneNumber) }}</p>
          <p>{{ formatAddress(data.province, data.district, data.ward, data.detailAddress) }}</p>
        </div>
      </div>
      <div class="col-span-12 md:col-span-8">
        <Timeline :items="data.orderHistories" />
      </div>
    </div>
    <div class="mt-4">
      <p class="text-xl font-medium mb-2">Sản phẩm</p>
      <CartItem
        v-for="item in data.orderItemDetails"
        class="!py-3"
        :product="item"
        :key="item.id"
        hide-actions
        size="small"
      />
    </div>
    <!-- <div class="grid grid-cols-12 mt-5">
      <div class="col-start-8">
        a
      </div>
    </div> -->
    <div class="flex mt-6 pr-3">
      <div class="w-full md:w-1/2 xl:w-1/2 ml-auto">
        <div class="font-medium text-gray-600 mb-2">
          Tổng tiền hàng: <span class="float-right">{{ formatPrice(data.subTotalPrice) }}</span>
        </div>
        <div class="font-medium text-gray-600 mb-2">
          Phí vận chuyển: <span class="float-right">{{ formatPrice(data.shippingFee) }}</span>
        </div>
        <div class="border-t border-gray-300 my-3"></div>
        <div class="font-medium text-xl text-red-600">
          Tổng tiền: <span class="float-right">{{ formatPrice(data.totalPrice) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { OrderDetail } from '~/types';


definePageMeta({
  layout: "user",
  path: "/user/purchase/:orderCode"
});

const route = useRoute();
const authStore = useAuthStore();
const orderStatus = route.params.orderCode as string;

const { data } = await useAsyncData<OrderDetail>("order-detail", () => authStore.getOrderDetail(orderStatus));

</script>

<style scoped>

</style>