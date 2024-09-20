<template>
  <div class="flex justify-between items-center md:mb-4">
    <h4 class="font-medium text-lg">Địa chỉ của tôi</h4>
    <button class="btn-small px-4" @click="createDialog = true">
      <i class="fa-regular fa-plus mr-1"></i>
      Thêm địa chỉ
    </button>
  </div>
  <SkeletonUserAddress v-if="pending" />
  <div v-else>
    <div v-for="add in addresses" :key="add.id"
      class="flex flex-col sm:flex-row justify-between items-start gap-2 py-5 border-b border-gray-300"
    >
      <div>
        <p class="font-medium mb-1">{{ add.name }}</p>
        <div class="text-gray-500">
          <div class="text-black mb-1 font-base flex flex-col sm:flex-row gap-x-2">
            <span>{{ add.receiverName }} </span>
            <span class="hidden sm:block">|</span>
            <span>{{ formatPhoneNumber(add.phoneNumber) }}</span>
          </div> 
          <p class="leading-[20px] text-sm sm:text-base">
            {{ formatAddress(add.province, add.district, add.ward) }} <br>
            {{ add.detailAddress }}
          </p>
        </div>
      </div>
      <div class="flex-shrink-0 flex sm:flex-col gap-x-4 gap-y-1 text-blue-500">
        <p class="cursor-pointer">Cập nhật</p>
        <button @click="deleteAddress(add.id)" class="cursor-pointer text-right">Xóa</button>
      </div>
    </div>

    <!-- create form -->
    <Dialog persistent v-model="createDialog" width="680px" max-width="95%">
      <form class="px-6 py-6 bg-white rounded-md">
        <h4 class="text-xl font-medium mb-4">Địa chỉ mới</h4>
        <div class="grid grid-cols-12 gap-x-4">
          <InputText 
            ref="nameRef"
            class="col-span-12 sm:col-span-6"
            v-model="newAddress.name"
            label="Tên địa chỉ"
            required
            :rules="[isRequired('tên địa chỉ')]"
          />
          <InputText 
            ref="phoneRef"
            class="col-span-12 sm:col-span-6"
            v-model="newAddress.phoneNumber"
            label="Số điện thoại"
            required
            :rules="[isRequired('số điện thoại')]"
          />
          <InputText 
            ref="receiverNameRef"
            class="col-span-12"
            v-model="newAddress.receiverName"
            label="Tên người nhận"
            required
            :rules="[isRequired('tên người nhận')]"
          />
          <Select 
            ref="provinceRef"
            class="col-span-12 sm:col-span-4"
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
            class="col-span-12 sm:col-span-4"
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
            class="col-span-12 sm:col-span-4"
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
            class="col-span-12"
            v-model="newAddress.detailAddress"
            label="Địa chỉ chi tiết"
            required
            :rules="[isRequired('địa chỉ chi tiết')]"
          />
        </div>
        <div class="flex gap-4 mt-3">
          <Button class="rounded-sm bg-gray-100 hover:bg-gray-200 text-gray-800" @click="closeCreateDialog">
            Trở lại
          </Button>
          <Button class="rounded-sm hover:bg-primary-600" @click="createAddress">Hoàn thành</Button>
        </div>
      </form>
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { Address, IResponse, AddressData } from '~/types';
import { formatPhoneNumber, formatAddress } from "~/utils";

definePageMeta({
  layout: "user",
});

const createDialog = ref(false);
const authStore = useAuthStore();
const checkoutStore = useCheckoutStore();

const newAddress = reactive({
  name: "",
  receiverName: "",
  province: "",
  district: "",
  ward: "",
  detailAddress: "",
  phoneNumber: ""
})

const { data: addresses, pending } = await useAsyncData<Address[]>("addresses", () => authStore.getAddresses());

async function createAddress() {
  const { data } = await useAsyncData<Address>("create-address", () => authStore.createAddresses(newAddress as Address));
  if (data.value) {
    addresses.value?.unshift(data.value);
    closeCreateDialog();
  }
}
async function closeCreateDialog() {
  createDialog.value = false;
}
async function updateAddress() {
  
}

async function deleteAddress(id:string | number) {
  const { data, status } = await useAsyncData<IResponse<null>>("delete-address", () => authStore.deleteAddresses(id));
  if (status.value == "success" && data.value?.statusCode == 200) {
    const deleteIndex = addresses.value?.findIndex(address => address.id == id) as number;
    addresses.value?.splice(deleteIndex, 1);
  }
}
const selectedProvince = ref<AddressData>({} as AddressData);
const selectedDistrict = ref<AddressData>({} as AddressData);
const selectedWard = ref<AddressData>({} as AddressData);

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
  newAddress.province = province.full_name;
})

watch(selectedDistrict, (district) => {
  selectedWard.value = {} as AddressData;
  newAddress.district = district.full_name;
})

watch(selectedWard, (ward) => {
  newAddress.ward = ward.full_name;
})
</script>

<style scoped>

</style>