<template>
  <div class="flex flex-col min-h-screen">
    <LayoutHeader />
    <div class="bg-[#f4f4f4] pt-4 md:pt-8 pb-5 flex-grow">
      <div class="container mx-auto grid grid-cols-12 gap-4 h-full">
        <div class="col-span-12 md:col-span-4 lg:col-span-3 h-full">
          <nav class="bg-white py-3 md:py-5 pl-5 pr-4 rounded-lg md:h-full">
            <ul>
              <li v-for="nav in navigations" class="mb-3 last-of-type:mb-0">
                <NuxtLink :to="nav.path" class="flex items-center gap-x-3 font-medium hover:text-primary">
                  <div class="w-5"><i :class="nav.icon"></i></div>
                  <span>{{ nav.title }}</span>
                </NuxtLink>
              </li>
            </ul>
          </nav>
        </div>
        <div class="col-span-12 md:col-span-8">
          <div class="bg-white py-3 px-2 sm:px-4 md:py-5 rounded-lg h-full">
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
  // {
  //   title: "Địa chỉ",
  //   path: "/user/address",
  //   icon: "fa-regular fa-location-dot",
  // },
  // {
  //   title: "Đổi mật khẩu",
  //   path: "/user/password",
  //   icon: "fa-regular fa-lock-keyhole",
  // },
  {
    title: "Đơn mua",
    path: "/user/purchase",
    icon: "fa-regular fa-clipboard-list-check",
  }
]

</script>
<style scoped>
nav .router-link-active {
  color: var(--tw-color-primary-600);
}
</style>