<template>
  <h4 class="font-medium text-lg mb-4">Thông tin cá nhân</h4>
  <SkeletonUserProfile v-if="pending" />
  <div v-else>
    <div class="grid grid-cols-12 gap-x-4 gap-y-2">
      <InputText 
        ref="nameRef"
        class="col-span-6"
        v-model="newProfile.firstName"
        label="Họ"
        name="fullName"
        required
        :rules="[isRequired('họ tên')]"
      />
      <InputText 
        ref="nameRef"
        class="col-span-6"
        v-model="newProfile.lastName"
        label="Tên"
        name="fullName"
        required
        :rules="[isRequired('họ tên')]"
      />
      <InputText 
        ref="nameRef"
        class="col-span-12"
        v-model="newProfile.email"
        label="Email"
        name="fullName"
        required
        :rules="[isRequired('email')]"
      />
      <Select 
        class="col-span-6"
        v-model="newProfile.gender"
        name="gender"
        :items="genders"
        label="Giới tính"
        title-default="Chọn giới tính"
      />
      <VDatePicker 
        v-model="newProfile.dateOfBirth" 
        :max-date="new Date()"
        locale="vi"
      >
        <template #default="{ togglePopover }">
          <InputText 
            class="col-span-6"
            :model-value="formatDate(newProfile.dateOfBirth)"
            readonly
            label="Ngày sinh"
            name="dob"
            @focus="togglePopover"
          />
        </template>
      </VDatePicker>
    </div>
    <div 
      v-if="newProfile.status === 'NOT_VERIFY'"
      class="flex justify-between items-center px-5 py-4 bg-opacity-60 bg-red-300 w-full rounded-xl"
    >
      <p class="font-medium text-red-700">Email chưa được xác minh!</p>
      <button class="py-1 px-3 rounded-lg bg-primary text-white">Xác minh</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { AuthUser, UserGender } from "~/types"
import { formatDate } from "~/utils";

definePageMeta({
  layout: "user",
});
const authStore = useAuthStore();

type genderType = {
  title: string,
  value: UserGender
}
const loading = true

const genders: genderType[] = [
  {
    title: "Nam",
    value: "MALE"
  },
  {
    title: "Nữ",
    value: "FEMALE"
  },
  {
    title: "Khác",
    value: "OTHER"
  },
]

const newProfile = ref<AuthUser>({} as AuthUser)

const { data: profile, pending } = await useAsyncData<AuthUser>('profile', () => authStore.getProfile());

if (profile.value) {
  newProfile.value = { ...profile.value };
}
</script>

<style scoped>
/* ::v-deep(.vc-highlight-content-solid), ::v-deep(.vc-nav-item.is-active) {
  background-color: var(--tw-color-primary);
}

::v-deep(.vc-nav-item.is-current) {
  color: var(--tw-color-primary);
}

::v-deep(.vc-focus:focus-within) {
  outline: none;
  box-shadow: none;
} */
</style>