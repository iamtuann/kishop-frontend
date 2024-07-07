<template>
  <header class="shadow-sm bg-white px-5">
      <nav class="container mx-auto py-2 flex justify-between items-center h-16">
        <NuxtLink to="/" class="font-bold text-xl text-primary-600">KiShop</NuxtLink>
        <ul class="hidden md:flex gap-2 md:gap-1">
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
          <li v-for="route in routes" :key="route.href">
            <NuxtLink class="nav-item" :to="route.href">{{ route.title }}</NuxtLink>
          </li>
        </ul>
        <ul class="flex items-center gap-1">
          <Search />
          <NuxtLink to="/">
            <span class="p-[6px] material-symbols-outlined semibold-style-icon cursor-pointer">person</span>
          </NuxtLink>
          <NuxtLink to="/cart" class="relative">
            <div>
              <span class="p-[6px] material-symbols-outlined semibold-style-icon cursor-pointer">shopping_cart</span>
              <span v-show="cartStore.countProducts > 0" class="count-cart">{{ cartStore.countProducts }}</span>
            </div>
          </NuxtLink>
          <div class="md:hidden" @click="isOpenMenu = !isOpenMenu">
            <span class="p-[6px] material-symbols-outlined semibold-style-icon cursor-pointer">menu</span>
          </div>
        </ul>

        <!-- Nav mobile -->
        <div
          class="md:hidden mobile-menu-wrap" :class="{'menu-open': isOpenMenu}" 
          tabindex="0" @keydown.esc="handleExit" ref="mobileMenuRef"
        >
          <div class="flex px-6 py-3 justify-end">
            <button class="flex" @click="isOpenMenu = !isOpenMenu">
              <span class="text-3xl leading-none material-symbols-outlined semibold-style-icon cursor-pointer">close</span>
            </button>
          </div>
          <div class="py-6">
            <NuxtLink 
              v-for="route in routes" 
              :key="route.href"
              :to="route.href"
              @click="isOpenMenu = false"
              class="flex justify-between items-center nav-item-mobile"
            >
              <span>{{ route.title }}</span>
              <span class="text-3xl leading-none material-symbols-outlined normal-style-icon">chevron_right</span>
            </NuxtLink>
          </div>
        </div>
        <div class="overlay md:hidden" :class="{'menu-open': isOpenMenu}" @click="isOpenMenu = !isOpenMenu"></div>
      </nav>
    </header>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";

const isOpenMenu: Ref<boolean> = ref(false);
const mobileMenuRef = ref<HTMLDivElement>();
const cartStore = useCartStore();

onMounted(async () => {
  await cartStore.getProductsBasicInCart();
})

watch(isOpenMenu, (newVal) => {
  if (newVal) {
    mobileMenuRef.value?.focus();
  }
})

const routes = [
  {title: 'Nam', href: 'men', children: []},
  {title: 'Nữ', href: 'women', children: []},
  {title: 'Trẻ em', href: 'kids', children: []},
  {title: 'Giảm giá', href: 'flash-sale', children: []},
  {title: 'Về chúng tôi', href: 'about', children: []},
]

function handleExit() {
  if (isOpenMenu.value) {
    isOpenMenu.value = false;
  }
}
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
.count-cart {
  position: absolute;
  width: 15px;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 9px;
  left: 17px;
  top: 1px;
  font-weight: 500;
  border-radius: 50%;
  color: #fff;
  background-color: #000;
}

.mobile-menu-wrap {
  position: fixed;
  overflow: hidden;
  padding: 12px 0;
  top: 0;
  right: 0;
  width: min(100vw, 320px);
  height: 100%;
  transform: translate(101%);
  transition: transform .5s cubic-bezier(.4,0,.2,1);
  background-color: #FFF;
  z-index: 100;
  outline: none;
}

.mobile-menu-wrap.menu-open {
  transform: translate(0);
}

.nav-item-mobile {
  padding: 8px 24px 8px 36px;
  font-size: 20px;
  font-weight: 500;
  text-decoration: none;
}
.nav-item-mobile:hover {
  color: #707072;
}

.overlay {
  background-color: rgba(17, 17, 17, 0.36);
  bottom: 0;
  left: 0;
  opacity: 0;
  position: fixed;
  right: 0;
  top: 0;
  -webkit-transition: opacity 250ms, visibility 0s linear 250ms;
  transition: opacity 250ms, visibility 0s linear 250ms;
  visibility: hidden;
  z-index: 99;
}
.overlay.menu-open {
  opacity: 1;
  visibility: visible;
  -webkit-transition: opacity 800ms ease, visibility 0s;
  transition: opacity 800ms ease, visibility 0s;
}

@media (max-width: 1023px) { 
  .nav-item {
    padding: 8px 6px;
    font-size: 15px;
  }
}
</style>