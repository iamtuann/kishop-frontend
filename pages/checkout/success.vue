<template>
  <div class="flex flex-grow flex-col md:flex-row">
    <div class="flex-grow p-5 bg-[#31c07e]">
      <div class="mt-14 flex flex-col items-center relative">
        <video ref="video" class="congrat-video" width="200" autoplay preload="metadata" muted src="~/assets/images/congratulation.webm" >
        </video>
        <svg width="133px" height="133px" viewBox="0 0 133 133" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <g id="check-group" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
            <circle id="filled-circle" fill="#FFFFFF" cx="66.5" cy="66.5" r="54.5"></circle>
            <circle id="green-circle" fill="#31c07e" cx="66.5" cy="66.5" r="55.5"></circle>
            <circle id="outline" stroke="#FFFFFF" stroke-width="4" cx="66.5" cy="66.5" r="54.5"></circle>
            <polyline id="check" stroke="#2cb074" stroke-width="12" points="41 70 56 85 92 49"></polyline>
          </g>
        </svg>
        <div class="text-white text-center my-8">
          <p class="mb-2">THANK YOU</p>
          <h3 class="text-lg font-medium">ĐẶT HÀNG THÀNH CÔNG</h3>
          <p class="text-sm text-slate-100">Chúng tôi sẽ xác nhận đơn hàng và giao hàng đến cho bạn trong thời gian ngắn nhất.</p>
        </div>
      </div>
    </div>
    <div class="w-full md:w-[400px] bg-[#f4f5f7] text-sm font-medium">
      <div class="px-5 py-4">
        <p>MÃ ĐƠN HÀNG <span class="text-xl">{{ orderInfo.orderCode }}</span></p>
        <p v-if="orderInfo.paymentType === 'COD'">Thanh toán khi nhận hàng</p>
        <p v-if="orderInfo.paymentType === 'BANKING'">Thanh toán online</p>
      </div>
      <div class="px-5 py-4 border-b border-gray-200 bg-white">
        <i class="fa-light fa-truck-fast fa-xl mr-4"></i>
        <span class="text-base">Địa chỉ giao hàng</span>
      </div>
      <div class="px-5 py-4 border-b border-gray-200 bg-white">
        {{ formatAddress(orderInfo.province, orderInfo.district, orderInfo.ward, orderInfo.detailAddress) }}
        <br> {{ orderInfo.note }}
      </div>
      <div class="px-5 py-4 border-b border-gray-200 bg-white">
        <i class="fa-light fa-address-book fa-xl mr-4"></i>
        <span class="text-base">Thông tin liên hệ</span>
      </div>
      <div class="px-5 py-4 border-b border-gray-200 bg-white">
        {{ orderInfo.receiverName }} <br>
        {{ orderInfo.phoneNumber }}
      </div>
      <div class="px-5 py-4 bg-[#f4f5f7]">
        <div class="flex justify-between mb-4">
          <span>Tổng tiền hàng</span>
          <span>{{ formatPrice(orderInfo.subTotalPrice) }}</span>
        </div>
        <div class="flex justify-between mb-4">
          <span>Phí vận chuyển</span>
          <span>{{ formatPrice(orderInfo.shippingFee) }}</span>
        </div>
        <div class="border-b border-gray-400 mb-4"></div>
        <div class="flex justify-between text-base">
          <span>Tổng tiền</span>
          <span>{{ formatPrice(orderInfo.totalPrice) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { formatAddress, formatPrice } from "~/utils";
definePageMeta({
  layout: "simple",
});
const video = ref<HTMLVideoElement>();
const checkoutStore = useCheckoutStore();
const { orderInfo } = storeToRefs(checkoutStore);

if (!checkoutStore.isCheckoutSuccess) {
  navigateTo("/", { replace: true });
}

onMounted(() => {
  if (video.value) {
    video.value.playbackRate = 0.75;
  }
  checkoutStore.isCheckoutSuccess = false;
})

const radius = 55;
const circumf = 3.1416 * radius * 2 + "px";
const check_len = "80px";
</script>

<style scoped>

.congrat-video {
  position: absolute;
  top: 12px;
}

/* check animation */
@keyframes outline {
  from {
    stroke-dasharray: 0, v-bind(circumf);
  }
  to {
    stroke-dasharray: v-bind(circumf), v-bind(circumf);
  }
}

#outline {
  animation: .38s ease-in outline;
  transform: rotate(0deg);
  transform-origin: center;
}

@keyframes circle {
  from {
    transform: scale(1);
  }
  to {
    transform: scale(0);
  }
}

#green-circle {
  animation: .35s ease-in .35s forwards circle;
  transform: none;
  transform-origin: center;
}

@keyframes check {
  from {
    stroke-dasharray: 0, v-bind(check_len);
    opacity: 1;
  }
  to {
    stroke-dasharray: v-bind(check_len), v-bind(check_len);
    opacity: 1;
  }
}

#check {
  animation: .34s cubic-bezier(0.65, 0, 1, 1) .7s forwards check; 
  stroke-dasharray: 0, v-bind(check_len);
  stroke-linejoin: round;
  stroke-linecap: round;
  opacity: 0;
}

@keyframes check-group {
  from {
    transform: scale(1);
  }
  
  50% {
    transform: scale(1.09);
  }
  
  to {
    transform: scale(1);
  }
}

#check-group {
  animation: .32s ease-in-out 1.03s check-group;
  transform-origin: center;
}

</style>