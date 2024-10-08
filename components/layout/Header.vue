<template>
  <div v-if="props.type != 'simple'" class="hidden md:block px-3 py-2 bg-primary font-sans">
    <div class="flex justify-between items-center container mx-auto text-xs text-white ">
      <div class="flex items-center">
        <i class="fa-light fa-phone fa-lg"></i>
        <span class="ms-2">+84 989 382 xxx</span>
      </div>
      <div class="hidden md:block">
        Get 50% Off on selected Item | Shop now
      </div>
      <div v-if="!isAuthenticated" class="hidden md:flex items-center font-medium">
        <NuxtLink :to="{name: 'login'}" class="hover:underline">
          Đăng nhập
        </NuxtLink>
        <div class="border-white h-3 mx-3 border-r"></div>
        <NuxtLink :to="{name: 'register'}"  class="hover:underline">
          Đăng ký
        </NuxtLink>
      </div>
    </div>
  </div>
  <div :class="{'h-16': isFixed}"></div>
  <header class="shadow-md bg-white h-16"
    :class="{'fixed top-0 left-0 w-full z-[99]': isFixed, '-translate-y-16': isHidden && isFixed}"
  >
    <nav class="container mx-auto py-2 flex justify-between items-center">
      <NuxtLink to="/" class="font-bold text-xl text-primary-600">KiShop</NuxtLink>
      <ul v-if="props.type != 'simple'" class="hidden md:flex gap-2 md:gap-1">
        <!-- <li class="relative nav-item-parent">
          <div class="nav-item flex items-center">
            <span class="">Thương hiệu </span>
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
      <div class="flex items-center gap-4">
        <Search v-if="props.type != 'simple'" />
        <NuxtLink :to="{name: 'cart'}" class="relative">
          <div>
            <span class="p-[6px] cursor-pointer">
              <i class="fa-light fa-bag-shopping fa-lg"></i>
            </span>
            <span v-if="!isAuthenticated" v-show="cartStore.totalCartItemsLocal > 0" class="count-cart">{{ cartStore.totalCartItemsLocal }}</span>
            <span v-else v-show="cartStore.totalCartItemsAuth > 0" class="count-cart">{{ cartStore.totalCartItemsAuth }}</span>
          </div>
        </NuxtLink>
        
        <UserPopper v-if="isAuthenticated" />

        <div class="md:hidden" @click="isOpenMenu = !isOpenMenu">
          <span class="p-[6px] cursor-pointer">
            <i class="fa-regular fa-bars fa-lg"></i>
          </span>
        </div>
      </div>
    </nav>
  </header>

  <!-- Nav mobile -->
  <div class="overlay md:hidden" :class="{'menu-open': isOpenMenu}" @click="isOpenMenu = !isOpenMenu"></div>
  <div
    class="md:hidden mobile-menu-wrap" :class="{'menu-open': isOpenMenu}" 
    tabindex="0" @keydown.esc="handleExit" ref="mobileMenuRef"
  >
    <div class="flex px-6 py-3 justify-end">
      <button class="flex text-2xl leading-none cursor-pointer" @click="isOpenMenu = !isOpenMenu">
        <i class="fa-regular fa-xmark"></i>
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
        <span class="text-lg leading-none">
          <i class="fa-regular fa-chevron-right"></i>
        </span>
      </NuxtLink>
    </div>
    <div v-if="!isAuthenticated" class="flex gap-x-4 mt-4 justify-center font-medium">
      <NuxtLink :to="{name: 'login'}" class="button-mobile">
        Đăng nhập
      </NuxtLink>
      <NuxtLink :to="{name: 'register'}"  class="button-mobile">
        Đăng ký
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";

type HeaderType = "default" | "simple";

const props = defineProps({
  type: {type: String as PropType<HeaderType>, required: false}
})

const isOpenMenu: Ref<boolean> = ref(false);
const mobileMenuRef = ref<HTMLDivElement>();
const cartStore = useCartStore();
const authStore = useAuthStore();
const {isAuthenticated} = storeToRefs(authStore);

watch(isOpenMenu, (newVal) => {
  if (newVal) {
    mobileMenuRef.value?.focus();
  }
})

const routes = [
  {title: 'Nam', href: '/men', children: []},
  {title: 'Nữ', href: '/women', children: []},
  {title: 'Trẻ em', href: '/kids', children: []},
  {title: 'Giảm giá', href: '/flash-sale', children: []},
  {title: 'Về chúng tôi', href: '/about', children: []},
]

function handleExit() {
  if (isOpenMenu.value) {
    isOpenMenu.value = false;
  }
}
const isFixed = ref(false);
const isHidden = ref(true);
let lastScrollPosition = 0;
const handleScroll = () => {
  const currentScrollPosition = window.scrollY;
  if (currentScrollPosition > 96) {
    isFixed.value = true;
    if (currentScrollPosition > lastScrollPosition) {
      isHidden.value = true;
    } else {
      isHidden.value = false;
    }
  } else {
    isFixed.value = false;
    isHidden.value = false;
  }
  lastScrollPosition = currentScrollPosition;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
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
  left: 14px;
  top: -2px;
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

.button-mobile {
  @apply px-4 py-2 bg-white rounded-full border-slate-950 border hover:bg-slate-950 hover:text-white transition-all duration-200 ease-in-out
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