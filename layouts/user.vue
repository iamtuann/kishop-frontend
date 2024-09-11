<template>
  <div class="flex flex-col min-h-screen">
    <LayoutHeader />
    <div class="bg-[#f4f4f4] pt-8 pb-5 flex-grow grid">
      <div class="container mx-auto grid grid-cols-12 gap-4 h-100">
        <div class="col-span-12 md:col-span-4">
          <nav class="bg-white py-5 pl-5 pr-4 rounded-lg h-full">
            <ul>
              <li v-for="nav in navigations" class="mb-3">
                <NuxtLink :to="nav.path" class="flex items-center gap-x-3 font-medium mb-2 hover:text-primary">
                  <div class="w-5"><i :class="nav.icon"></i></div>
                  <span>{{ nav.title }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-span-12 md:col-span-8">
          <div class="bg-white py-5 pl-5 pr-4 rounded-lg h-full">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const navigations = [
  {
    title: "Hồ sơ",
    path: "/user/profile",
    icon: "fa-regular fa-user",
  },
  {
    title: "Địa chỉ",
    path: "/user/address",
    icon: "fa-regular fa-location-dot",
  },
  {
    title: "Đổi mật khẩu",
    path: "/user/password",
    icon: "fa-regular fa-lock-keyhole",
  },
  {
    title: "Đơn mua",
    path: "/user/purchase",
    icon: "fa-regular fa-clipboard-list-check",
  }
]

</script>
<style scoped>
nav .router-link-exact-active {
  color: var(--tw-color-primary-600);
}
</style>