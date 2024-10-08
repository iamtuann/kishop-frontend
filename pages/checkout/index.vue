<template>
  <div class="container mx-auto">
    <h3 class="font-sans mb-4 mt-6 text-3xl font-medium">Đặt hàng</h3>
    <form class="grid grid-cols-12 gap-5">
      <div class="col-span-12 md:col-span-6 lg:col-span-7 lg:pr-10">
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
            return-object
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
            return-object
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
            return-object
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
      <div class="col-span-12 md:col-span-6 lg:col-span-5">
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
            <Button :loading="loading" @click="hanldeSubmitOrder">Đặt hàng</Button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { AddressData, OrderPaymentInfo, OrderShippingInfo } from "~/types";
import { validateForm, isRequired } from "~/utils";
import { useCustomFetchData } from "~/composables";

definePageMeta({
  layout: "simple",
});

const checkoutStore = useCheckoutStore();

const selectedProvince = ref<AddressData>({} as AddressData);
const selectedDistrict = ref<AddressData>({} as AddressData);
const selectedWard = ref<AddressData>({} as AddressData);

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

const loading = ref(false);
async function hanldeSubmitOrder() {
  const valid = validateForm([nameRef, phoneRef, provinceRef, districtRef, wardRef, detailAddressRef]);
  if (valid) {
    const { data, pending } = await useAsyncData("create-order", () => checkoutStore.createOrder(shippingInfo));
    loading.value = pending.value;
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

const { data: provinces } = useAsyncData<AddressData[]>('provinces',
  () => checkoutStore.getProvinces(), {
  lazy: true,
  default: () => [] as AddressData[],
});

const { data: districts } = useAsyncData<AddressData[]>('districts', 
  () => checkoutStore.getDistricts(selectedProvince.value?.id), {
  watch: [selectedProvince],
  lazy: true,
  default: () => [] as AddressData[],
});

const { data: wards } = useAsyncData<AddressData[]>('wards',
  () => checkoutStore.getWards(selectedDistrict.value?.id), {
  watch: [selectedDistrict],
  lazy: true,
  default: () => [] as AddressData[],
});

watch(selectedProvince, (province) => {
  selectedDistrict.value = {} as AddressData;
  shippingInfo.province = province.full_name;
})

watch(selectedDistrict, (district) => {
  selectedWard.value = {} as AddressData;
  shippingInfo.district = district.full_name;
})

watch(selectedWard, (ward) => {
  shippingInfo.ward = ward.full_name;
})



</script>

<style scoped>

</style>