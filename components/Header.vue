<template>
  <header class="shadow-sm bg-white">
      <nav class="container mx-auto py-2 flex justify-between items-center h-16">
        <NuxtLink to="/" class="font-bold text-xl">KiShop</NuxtLink>
        <ul class="flex gap-4">
          <li class="nav-item">
            <div class="">Thương hiệu </div>
            <div>

            </div>
          </li>
          <li class="nav-item"><NuxtLink to="/men">Nam</NuxtLink></li>
          <li class="nav-item"><NuxtLink to="/women">Nữ</NuxtLink></li>
          <li class="nav-item"><NuxtLink to="/about">Mới</NuxtLink></li>
          <li class="nav-item"><NuxtLink to="/all">Tất cả sản phẩm</NuxtLink></li>
        </ul>
        <ul>
          <span class="material-symbols-outlined default-style-icon">search</span>
        </ul>
      </nav>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
</style>