<template>
  <div class="container mx-auto">
    <h3 class="font-sans mb-4 mt-6 text-3xl font-medium">Đặt hàng</h3>
    <form class="grid grid-cols-12 gap-5">
      <div class="col-span-7 pr-10">
        <p class="text-lg">Thông tin nhận hàng</p>
        <div class="mt-3">
          <InputText 
            class="mb-1"
            v-model="shippingInfo.fullName"
            label="Họ và tên"
            name="fullName"
            required
            :rules="[isRequired('họ tên')]"
          />
          <InputText 
            class="mb-1"
            v-model="shippingInfo.phoneNumber"
            label="Số điện thoại"
            name="phoneNumber"
            required
            :rules="[isRequired('số điện thoại')]"
          />
          <Select 
            class="mb-1"
            v-model="selectedProvince"
            name="city"
            :items="provinces"
            item-title="name"
            :rules="[isRequiredSelect('tỉnh/ thành phố')]"
            label="Tỉnh/ Thành phố"
            required
            title-default="Chọn tỉnh/ thành phố"
          />
          <Select 
            class="mb-1"
            v-model="selectedDistrict"
            name="district"
            :items="districts"
            item-title="name"
            :rules="[isRequiredSelect('quận/ huyện')]"
            label="Quận/ Huyện"
            required
            title-default="Chọn quận/ huyện"
          />
          <Select 
            class="mb-1"
            v-model="selectedWard"
            name="ward"
            :items="wards"
            item-title="name"
            :rules="[isRequiredSelect('phường/ xã')]"
            label="Phường/ Xã"
            required
            title-default="Chọn phường/ xã"
          />
          <InputText 
            class="mb-1"
            v-model="shippingInfo.detailAdress"
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
        <div class="mt-3">
          <CartList item-size="small" />

          <div class="flex justify-between my-3">
            <p>Tạm tính</p>
            <p class="ml-2">{{ formatPrice(subtotal) }}</p>
          </div>
          <div class="flex justify-between mb-3">
            <p>Phí vận chuyển </p>
            <p v-if="subtotal > totalPriceForFreeDelevery" class="ml-2 text-primary-600 font-semibold">Free</p>
            <p v-else class="ml-2">{{ formatPrice(deliveryFee) }}</p>
          </div>
          <div class="flex justify-between text-lg font-medium mb-3 mt-5 py-4 border-t-2 border-gray-700">
            <p>Tổng tiền</p>
            <p class="ml-2">{{ formatPrice(total) }}</p>
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
import { isRequired } from "@/utils/validationRules";
import { AdressData } from "~/types";

definePageMeta({
  layout: "simple",
});

const checkoutStore = useCheckoutStore();
const cartStore = useCartStore();

const selectedProvince = ref<AdressData>({} as AdressData);
const selectedDistrict = ref<AdressData>({} as AdressData);
const selectedWard = ref<AdressData>({} as AdressData);

const shippingInfo = reactive({
  fullName: "",
  phoneNumber: "",
  province: "",
  district: "",
  ward: "",
  detailAdress: "",
  note: "",
  paymentType: ""
})

function isRequiredSelect(name: string) {
  return (v: string | object) => !!v || `Vui lòng chọn ${name}`;
}

const deliveryFee: Ref<number> = ref(50000);
const totalPriceForFreeDelevery = 1000000;

const subtotal = computed(() => {
  return cartStore.cartItemDetails.reduce((totalPrice, currentProduct) => {
    return totalPrice + currentProduct.totalPrice;
  }, 0)
})

function hanldeSubmitOrder() {
  
}

const total = computed(() => {
  const deleveryFeeFinal = subtotal.value > totalPriceForFreeDelevery ? 0 : deliveryFee.value;
  return subtotal.value + deleveryFeeFinal;
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

watch(selectedProvince, () => {
  selectedDistrict.value = {} as AdressData;
})

watch(selectedDistrict, () => {
  selectedWard.value = {} as AdressData;
})



</script>

<style scoped>

</style>