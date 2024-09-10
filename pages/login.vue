<template>
  <div class="flex justify-center min-h-screen wrapper">
    <div class="login-wrap">
      <div class="text-center">
        <NuxtLink to="/" class="font-bold text-xl text-primary-600">KiShop</NuxtLink>
        <p class="mt-3 font-medium font-sans text-xl uppercase">
          Đăng nhập
        </p>
      </div>
      <form class="mt-3" @submit.prevent="handleLogin">
        <InputText
          ref="emailRef"
          class="mb-1"
          name="email"
          label="Email"
          placeholder="Nhập email của bạn"
          required
          v-model="login.email"
          :rules="[isRequired('email'), isEmail]"
        />
        <InputText 
          ref="passwordRef"
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

        <button type="submit" class="btn-primary rounded-lg py-3 text-lg mt-4 hover:bg-primary-600 transition-all">
          <span>Đăng nhập</span>
        </button>
      </form>
      
      <div class="my-5 flex items-center gap-x-4">
        <hr class="border-gray-300 border-t-[2px] flex-1">
        <span class="text-gray-500 font-sans text-sm">HOẶC</span>
        <hr class="border-gray-300 border-t-[2px] flex-1">
      </div>
      
      <div>
        <button class="btn-primary rounded-lg py-3 bg-white border-gray-600 text-gray-700 hover:border-gray-800">
          <div class="flex items-center gap-4">
            <img src="../assets/images/logo-fb-small.png" width="25" height="25" alt="facebook">
            <span>Đăng nhập bằng Facebook</span>
          </div>
        </button>
        <button class="btn-primary rounded-lg py-3 mt-3 bg-white border-gray-600 text-gray-800 hover:border-gray-800 transition-all">
          <div class="flex items-center gap-4">
            <img src="../assets/images/logo-gg-small.png" width="25" height="25" alt="google">
            <span>Đăng nhập bằng Google</span>
          </div>
        </button>
        <p class="text-gray-700 mt-3 text-center">
          Chưa có tài khoản? 
          <NuxtLink to="/register" class="font-medium underline text-primary-600">Đăng ký</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isRequired, isEmail } from "@/utils";
import InputText from "~/components/InputText.vue";
import { validateForm } from "~/utils/validateForm";

definePageMeta({
  layout: "blank"
})

const authStore = useAuthStore();

type loginInput = {
  email: string,
  password: string,
}

const login: loginInput = reactive({
  email: "",
  password: ""
})
const emailRef = ref(null);
const passwordRef = ref(null);
const isShowing: Ref<boolean> = ref(false);
const errMsg: Ref<string> = ref("");

async function handleLogin() {
  errMsg.value = "";
  try {
    const valid = validateForm([emailRef, passwordRef]);
    if(valid) {
      const response = await authStore.login(login.email, login.password);
      if(response.statusCode === 200) {
        await navigateTo('/')
      } else {
        errMsg.value = response.error;
      }
    }
  } catch (error) {
    console.log(error);
    errMsg.value = "Opps, có lỗi xảy ra vui lòng thử lại sau!";
  }
}

watch(login, () => {
  errMsg.value = "";
})
</script>

<style scoped>
.wrapper {
  background-image: url("@/assets/images/bg-login-medium.jpg");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.login-wrap {
  width: 620px;
  max-width: 100%;
  background-color: #fff;
  border-radius: 24px;
  margin-top: 40px;
  padding: 28px 80px;
  border: 1px solid rgba(102, 102, 102, 0.5);
  height: 100%;
}
.message {
  color: #ff5454;
  margin: 0 10px;
  font-size: 13px;
  line-height: 16px;
  height: 16px;
}
</style>