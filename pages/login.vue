<template>
  <div class="flex justify-center min-h-screen wrapper">
    <div class="login-wrap">
      <div class="text-center">
        <NuxtLink to="/" class="font-bold text-xl text-primary-600">KiShop</NuxtLink>
        <p class="mt-4 font-medium font-sans text-lg">
          Đăng nhập
        </p>
      </div>
      <div class="mt-4">
        <InputText 
          name="email"
          label="Email"
          placeholder="Nhập email của bạn"
          required
          v-model="login.email"
          :rules="[isRequired('email'), isEmail]"
        />
        <InputText 
          name="password"
          label="Mật khẩu"
          placeholder="****"
          required
          :type="isShowing ? 'text' : 'password'"
          v-model="login.password"
          :rules="[isRequired('mật khẩu')]"
        >
          <template v-slot:right_label>
            <div class="flex cursor-pointer" @click="isShowing = !isShowing">
              <span v-show="!isShowing" class="default-style-icon material-symbols-outlined text-gray-500 leading-5">visibility</span>
              <span v-show="isShowing" class="default-style-icon material-symbols-outlined text-gray-500 leading-5">visibility_off</span>
            </div>
          </template>
        </InputText>
      </div>
      <button class="btn-primary text-lg mt-5 hover:bg-primary-600 transition-all">
        <span>Đăng nhập</span>
      </button>
      
      <div class="my-6 flex items-center gap-x-4">
        <hr class="border-gray-300 border-t-[2px] flex-1">
        <span class="text-gray-500 font-sans">HOẶC</span>
        <hr class="border-gray-300 border-t-[2px] flex-1">
      </div>
      
      <div>
        <button class="btn-primary bg-white border-gray-600 text-gray-700 hover:border-gray-800">
          <div class="flex items-center gap-4">
            <img src="../assets/images/logo-fb-small.png" width="25" height="25" alt="facebook">
            <span>Đăng nhập bằng Facebook</span>
          </div>
        </button>
        <button class="btn-primary mt-3 bg-white border-gray-600 text-gray-800 hover:border-gray-800 transition-all">
          <div class="flex items-center gap-4">
            <img src="../assets/images/logo-gg-small.png" width="25" height="25" alt="google">
            <span>Đăng nhập bằng Google</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isRequired, isEmail } from "@/utils/validationRules";

definePageMeta({
  layout: "blank"
})

type loginInput = {
  email: string,
  password: string,
}

const login: loginInput = reactive({
  email: "",
  password: ""
})
const isShowing: Ref<boolean> = ref(false);
</script>

<style scoped>
.wrapper {
  background-image: url("@/assets/images/bg-login-medium.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login-wrap {
  width: 650px;
  max-width: 100%;
  background-color: #fff;
  border-radius: 24px;
  margin-top: 40px;
  padding: 32px 100px;
  border: 1px solid rgba(102, 102, 102, 0.5);
  height: 100%;
}
</style>