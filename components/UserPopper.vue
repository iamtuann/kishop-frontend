<template>
  <div class="p-1 relative" @mouseenter="show=true" @mouseleave="show=false">
    <i class="fa-light fa-circle-user fa-lg"></i>
    <Transition>
      <div v-show="show" class="border border-gray-500 bg-white propper">
        <NuxtLink to="/user/profile" class="nav-link">
          <i class="w-5 fa-light fa-circle-user fa-lg"></i>
          <span>Thông tin cá nhân</span>
        </NuxtLink>
        <NuxtLink to="/user/purchase" class="nav-link">
          <i class="w-5 fa-regular fa-clipboard-list-check fa-lg"></i>
          <span>Đơn mua</span>
        </NuxtLink>
        <div @click="logout" class="nav-link cursor-pointer">
          <i class="w-5 fa-regular fa-arrow-right-from-bracket fa-lg"></i>
          <span>Đăng xuất</span>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">

const authStore = useAuthStore();
const show = ref(false);
function logout() {
  authStore.logout();
  navigateTo("/login", { replace: true });
}
</script>

<style scoped>
.propper {
  position: absolute;
  padding: 12px 0;
  right: -12px;
  top: calc(100% + 4px);
  width: max-content;
  min-width: 180px;
  border-radius: 4px;
  z-index: 999;
}
.propper::before {
  content: "";
  position: absolute;
  width: 100%;
  height: 16px;
  background-color: transparent;
  top: -12px;
  left: 0;
}
.nav-link {
  @apply flex items-center px-3 py-2 gap-x-3 hover:bg-slate-100 hover:text-primary
}

.v-enter-active {
  transition: all 0.2s ease-out;
}

.v-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.v-enter-from,
.v-leave-to {
  transform: translateY(12px);
  opacity: 0;
}
</style>