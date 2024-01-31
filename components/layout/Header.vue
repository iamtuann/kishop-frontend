<template>
  <header class="shadow-sm bg-white">
      <nav class="container mx-auto py-2 flex justify-between items-center h-16">
        <NuxtLink to="/" class="font-bold text-xl text-primary-600">KiShop</NuxtLink>
        <ul class="flex gap-2">
          <!-- <li class="relative nav-item-parent">
            <div class="nav-item flex items-center">
              <span class="">Thương hiệu </span>
              <span class="material-symbols-outlined default-style-icon">expand_more</span>
            </div>
            <ul class="nav-child text-gray-600 font-semibold flex flex-wrap bg-white shadow-md">
              <div class="w-2/4">
                <li class="px-2 py-3 hover:text-primary transition-colors linear duration-300">
                  <NuxtLink class="block" to="/nike">Nike</NuxtLink>
                </li>
                <li class="px-2 py-3 hover:text-primary transition-colors linear duration-300">
                  <NuxtLink class="block" to="/adidas">Adidas</NuxtLink>
                </li>
                <li class="px-2 py-3 hover:text-primary transition-colors linear duration-300">
                  <NuxtLink class="block" to="/vans">Vans</NuxtLink>
                </li>
                <li class="px-2 py-3 hover:text-primary transition-colors linear duration-300">
                  <NuxtLink class="block" to="/converse">Converse</NuxtLink>
                </li>
              </div>
              <div class="w-2/4">
                <li class="px-2 py-3 hover:text-primary transition-colors linear duration-300">
                  <NuxtLink class="block" to="/reebok">Reebook</NuxtLink>
                </li>
                <li class="px-2 py-3 hover:text-primary transition-colors linear duration-300">
                  <NuxtLink class="block" to="/fila">Fila</NuxtLink>
                </li>
                <li class="px-2 py-3 hover:text-primary transition-colors linear duration-300">
                  <NuxtLink class="block" to="/new-balance">New Balance</NuxtLink>
                </li>
                <li class="px-2 py-3 hover:text-primary transition-colors linear duration-300">
                  <NuxtLink class="block" to="/asic">Asic</NuxtLink>
                </li>
              </div>
            </ul>
          </li> -->
          <li class=""><NuxtLink class="nav-item" to="/">Trang chủ</NuxtLink></li>
          <li class=""><NuxtLink class="nav-item" to="/men">Nam</NuxtLink></li>
          <li class=""><NuxtLink class="nav-item" to="/women">Nữ</NuxtLink></li>
          <li class=""><NuxtLink class="nav-item" to="/flash-sale">Giảm giá</NuxtLink></li>
          <li class=""><NuxtLink class="nav-item" to="/about">Về chúng tôi</NuxtLink></li>
        </ul>
        <ul class="flex items-center gap-3">
          <Search />
          <span class="p-1 material-symbols-outlined default-style-icon cursor-pointer">favorite</span>
          <span class="p-1 material-symbols-outlined default-style-icon cursor-pointer">shopping_cart</span>
        </ul>
      </nav>
    </header>
</template>

<script setup lang="ts">

</script>

<style scoped>
.nav-item {
  font-weight: 600;
  padding: 8px 12px;
  position: relative;
  display: flex;
  cursor: pointer;
}
.nav-item::before {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background-color: var(--text-color);
  visibility: hidden;
}
.nav-item:hover::before {
  visibility: visible;
}
.nav-child {
  position: absolute;
  top: 100%;
  padding: 8px 18px;
  width: 350px;
  border-radius: 2px;
  border: 1px solid rgb(240, 240, 240);
  transform: translateY(42px);
  opacity: 0;
  visibility: hidden;
  transition: all ease 0.2s;
  z-index: 1000;
}
.nav-child::before {
  content: "";
  position: absolute;
  top: -15px;
  left: 0;
  width: 100%;
  height: 15px;
  background-color: transparent;
}
.nav-item-parent:hover .nav-child {
  opacity: 1;
  visibility: visible;
  transform: translateY(12px);
}
</style>