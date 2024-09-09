<template>
  <div class="container mx-auto">
    <h3 class="font-sans mb-4 mt-6 text-3xl font-medium">Đặt hàng</h3>
    <form class="grid grid-cols-12 gap-5">
      <div class="col-span-7 pr-10">
        <p class="text-lg">Thông tin nhận hàng</p>
        <div class="mt-3">
          <InputText 
            ref="nameRef"
            class="mb-1"
            v-model="shippingInfo.receiverName"
            label="Họ và tên"
            name="fullName"
            required
            :rules="[isRequired('họ tên')]"
          />
          <InputText 
            ref="phoneRef"
            class="mb-1"
            v-model="shippingInfo.phoneNumber"
            label="Số điện thoại"
            name="phoneNumber"
            required
            :rules="[isRequired('số điện thoại')]"
          />
          <Select 
            ref="provinceRef"
            class="mb-1"
            v-model="selectedProvince"
            name="city"
            :items="provinces"
            item-title="name"
            :rules="[isRequired('tỉnh/ thành phố')]"
            label="Tỉnh/ Thành phố"
            required
            title-default="Chọn tỉnh/ thành phố"
          />
          <Select 
            ref="districtRef"
            class="mb-1"
            v-model="selectedDistrict"
            name="district"
            :items="districts"
            item-title="name"
            :rules="[isRequired('quận/ huyện')]"
            label="Quận/ Huyện"
            required
            title-default="Chọn quận/ huyện"
          />
          <Select 
            ref="wardRef"
            class="mb-1"
            v-model="selectedWard"
            name="ward"
            :items="wards"
            item-title="name"
            :rules="[isRequired('phường/ xã')]"
            label="Phường/ Xã"
            required
            title-default="Chọn phường/ xã"
          />
          <InputText 
            ref="detailAddressRef"
            class="mb-1"
            v-model="shippingInfo.detailAddress"
            label="Địa chỉ cụ thể"
            name="address"
            required
            :rules="[isRequired('địa chỉ cụ thể')]"
          />
          <InputText 
            v-model="shippingInfo.note"
            label="Ghi chú"
            placeholder="Nhập ghi chú nếu có"
          />
        </div>
      </div>
      <div class="col-span-5">
        <p class="text-lg">Danh sách sản phẩm</p>
        <div class="mt-3" v-if="paymentInfo">
          <CartItem
            v-for="product in paymentInfo.itemDetails"
            :key="product.detailId"
            :product="product"
            hide-actions
            size="small"
          />
          <div class="flex justify-between my-3">
            <p>Tạm tính</p>
            <p class="ml-2">{{ formatPrice(paymentInfo.subTotalPrice) }}</p>
          </div>
          <div class="flex justify-between mb-3">
            <p>Phí vận chuyển </p>
            <p v-if="paymentInfo.shippingFee <= 0" class="ml-2 text-primary-600 font-semibold">Free</p>
            <p v-else class="ml-2">{{ formatPrice(paymentInfo.shippingFee) }}</p>
          </div>
          <div class="flex justify-between text-lg font-medium mb-3 mt-5 py-4 border-t-2 border-gray-700">
            <p>Tổng tiền</p>
            <p class="ml-2">{{ formatPrice(paymentInfo.totalPrice) }}</p>
          </div>
          <div class="pt-5 pb-3">
            <button type="button" class="btn-primary" @click="hanldeSubmitOrder">Đặt hàng</button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { AdressData, OrderPaymentInfo, OrderShippingInfo } from "~/types";
import { validateForm, isRequired } from "~/utils";
import { useCustomFetchData } from "~/composables";

definePageMeta({
  layout: "simple",
});

const checkoutStore = useCheckoutStore();

const selectedProvince = ref<AdressData>({} as AdressData);
const selectedDistrict = ref<AdressData>({} as AdressData);
const selectedWard = ref<AdressData>({} as AdressData);

const nameRef = ref(null);
const phoneRef = ref(null);
const provinceRef = ref(null);
const districtRef = ref(null);
const wardRef = ref(null);
const detailAddressRef = ref(null);

const shippingInfo = reactive<OrderShippingInfo>({
  receiverName: "",
  phoneNumber: "",
  province: "",
  district: "",
  ward: "",
  detailAddress: "",
  note: "",
  paymentType: "COD"
})

async function hanldeSubmitOrder() {
  const valid = validateForm([nameRef, phoneRef, provinceRef, districtRef, wardRef, detailAddressRef]);
  if (valid) {
    const { data } = await useAsyncData("create-order", () => checkoutStore.createOrder(shippingInfo));
    if (data.value?.statusCode === 200) {
      navigateTo('/checkout/success');
    }
  }
}

const { data: paymentInfo, pending } = await useCustomFetchData<OrderPaymentInfo>(checkoutStore.getPaymentInfo, checkoutStore.getPaymentInfoFromCartItem);

watch(paymentInfo, () => {
  if (!paymentInfo.value?.itemDetails || paymentInfo.value?.itemDetails.length == 0) {
    navigateTo("/cart", { replace: true });
  }
})

const { data: provinces } = useAsyncData<AdressData[]>('provinces',
  () => checkoutStore.getProvinces(), {
  lazy: true,
  default: () => [] as AdressData[],
});

const { data: districts } = useAsyncData<AdressData[]>('districts', 
  () => checkoutStore.getDistricts(selectedProvince.value?.id), {
  watch: [selectedProvince],
  lazy: true,
  default: () => [] as AdressData[],
});

const { data: wards } = useAsyncData<AdressData[]>('wards',
  () => checkoutStore.getWards(selectedDistrict.value?.id), {
  watch: [selectedDistrict],
  lazy: true,
  default: () => [] as AdressData[],
});

watch(selectedProvince, (province) => {
  selectedDistrict.value = {} as AdressData;
  shippingInfo.province = province.full_name;
})

watch(selectedDistrict, (district) => {
  selectedWard.value = {} as AdressData;
  shippingInfo.district = district.full_name;
})

watch(selectedWard, (ward) => {
  shippingInfo.ward = ward.full_name;
})



</script>

<style scoped>

</style>