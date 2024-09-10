<template>
  <div class="grid grid-cols-12">
    <div class="col-span-12 md:col-span-6 bg-white">
      <div class="mx-auto px-10 py-8 max-w-[520px]">
        <NuxtLink to="/" class="font-bold text-xl text-primary-600">KiShop</NuxtLink>
        <form class="mt-5" @submit.prevent="handleRegister">
          <h3 class="text-center text-3xl font-medium mb-5">
            Tạo tài khoản
          </h3>
          <InputText
            ref="fullnameRef"
            name="fullname"
            class="mb-1"
            label="Họ tên"
            placeholder="Nhập họ tên của bạn"
            required
            v-model="registerForm.fullName"
            :rules="[isRequired('họ tên')]"
          />
          <InputText
            ref="emailRef"
            class="mb-1"
            name="email"
            label="Email"
            placeholder="Nhập email của bạn"
            required
            v-model="registerForm.email"
            :rules="[isRequired('email'), isEmail]"
          />
          <InputText 
            ref="passwordRef"
            label="Mật khẩu"
            placeholder="****"
            autocomplete="off"
            required
            :type="isShowing ? 'text' : 'password'"
            v-model="registerForm.password"
            :rules="[isRequired('mật khẩu')]"
          >
            <template v-slot:right_label>
              <div class="flex cursor-pointer" @click="isShowing = !isShowing">
                <span v-show="!isShowing" class="text-gray-500 leading-5 select-none">
                  <i class="fa-regular fa-eye"></i>
                </span>
                <span v-show="isShowing" class="text-gray-500 leading-5 select-none">
                  <i class="fa-regular fa-eye-slash"></i>
                </span>
              </div>
            </template>
          </InputText>
          <span v-show="errMsg" class="message">{{ errMsg }}</span>

          <Button type="submit" :loading="loading" class="rounded-lg py-3 text-lg mt-4 hover:bg-primary-600">
            Tạo tài khoản
          </Button>
        </form>
        
        <div class="my-5 flex items-center gap-x-4">
          <hr class="border-gray-300 border-t-[2px] flex-1">
          <span class="text-gray-500 font-sans text-sm">HOẶC</span>
          <hr class="border-gray-300 border-t-[2px] flex-1">
        </div>
        <div>
          <Button class="rounded-lg mt-3 bg-white hover:bg-white border-gray-600 text-gray-800 hover:border-gray-800">
            <template #prepend-icon>
              <img src="../assets/images/logo-gg-small.png" class="mr-4" dth="25" height="25" alt="google">
            </template>
            Đăng nhập bằng Google
          </Button>

          <p class="text-gray-700 mt-3 text-center">
            Đã có tài khoản? 
            <NuxtLink to="/login" class="font-medium underline text-primary-600">Đăng nhập</NuxtLink>
          </p>
          
        </div>
      </div>
    </div>
    <div class="hidden md:block md:col-span-6 banner">
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { isRequired, isEmail } from "@/utils";
import InputText from "~/components/InputText.vue";
import { IResponse, AuthResponse } from "~/types";
import { validateForm } from "~/utils/validateForm";

definePageMeta({
  layout: "blank"
})
const authStore = useAuthStore();

const registerForm = reactive({
  fullName: "",
  email: "",
  password: ""
})
const emailRef = ref(null);
const fullnameRef = ref(null);
const passwordRef = ref(null);
const isShowing: Ref<boolean> = ref(false);
const errMsg: Ref<string> = ref("");
const loading = ref(false);

async function handleRegister() {
  errMsg.value = "";
  try {
    const valid = validateForm([fullnameRef, emailRef, passwordRef]);
    if(valid) {
      loading.value = true;
      const { data } = await useAsyncData<IResponse<AuthResponse>>('register-user', 
        () => authStore.register(registerForm.fullName, registerForm.email, registerForm.password)
      );
      if(data.value?.statusCode === 200) {
        await navigateTo('/')
      } else {
        errMsg.value = data.value?.message || "Có lỗi xảy ra";
      }
      loading.value = false;
    }
  } catch (error) {
    console.log(error);
    errMsg.value = "Opps, có lỗi xảy ra vui lòng thử lại sau!";
  }
}
</script>

<style scoped>
.banner {
  background-image: url("@/assets/images/bg-login-medium.jpg");
  background-position: left center;
  background-repeat: no-repeat;
  background-size: cover;
}
.message {
  color: #ff5454;
  margin: 0 10px;
  font-size: 13px;
  line-height: 16px;
  height: 16px;
}
</style>