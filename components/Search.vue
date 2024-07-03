<template>
  <form @submit.prevent="search" class="search-wrap hidden md:flex items-center bg-gray-100 font-sans">
    <input 
      v-model="searchInput" 
      type="text" 
      class="search-input lg:w-[200px] w-[150px] flex-1 bg-transparent border-none outline-none text-gray-700 px-1" 
      placeholder="Tìm kiếm sản phẩm"
    >
    <span class="material-symbols-outlined normal-style-icon cursor-pointer">search</span>
  </form>
  <div class="md:hidden" @click="isOpenSearch = !isOpenSearch">
    <span class="material-symbols-outlined p-[6px] semibold-style-icon cursor-pointer">search</span>
  </div>
  <div 
    class="md:hidden mobile-search-wrap" :class="{'search-open': isOpenSearch}" 
    tabindex="0" @keydown.esc="handleExit"
  >
    <div class="pt-3 px-6 flex gap-2 sm:gap-6 items-center">
      <form @submit.prevent="search" class="search-input-container">
        <button type="submit">
          <span class="p-[6px] material-symbols-outlined normal-style-icon cursor-pointer">search</span>
        </button>
        <input type="text" 
          class="search-input flex-1 bg-transparent border-none outline-none text-sm text-gray-900 px-1"
          placeholder="Tìm kiếm sản phẩm"
          v-model="searchInput"
          ref="searchInputRef"
        >
        <span @click="clearInput" class="clear-btn material-symbols-outlined normal-style-icon">close</span>
      </form>
      <button class="flex" @click="isOpenSearch = !isOpenSearch">
        <span class="text-3xl leading-none material-symbols-outlined semibold-style-icon cursor-pointer">chevron_right</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const isOpenSearch: Ref<boolean> = ref(false);
const searchInput: Ref<string> = ref('');
const searchInputRef = ref<HTMLDivElement>();
const router = useRouter()

function search() {
  if (isOpenSearch.value) {
    isOpenSearch.value = false;
  }
  router.push({path: '/search', query: { q: searchInput.value }})
}

watch(isOpenSearch, (newVal) => {
  if (newVal) {
    searchInputRef.value?.focus();
  }
})
function clearInput() {
  searchInput.value = '';
  searchInputRef.value?.focus();
}
function handleExit() {
  if (isOpenSearch.value) {
    isOpenSearch.value = false;
  }
}
</script>

<style scoped>
.search-wrap {
  padding: 6px 12px;
  border-radius: 99px;
}
.search-input-container {
  display: flex;
  align-items: center;
  border-radius: 24px;
  background-color: #f5f5f5;
  width: 100%;
}
.search-input {
  /* color: var(--text-color); */
  font-weight: 500;
  font-size: 15px;
}
.search-input::placeholder {
  font-size: 14px;
  line-height: 1;
}

.mobile-search-wrap {
  position: fixed;
  overflow: hidden;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform: translate(101%);
  transition: transform .5s cubic-bezier(.4,0,.2,1);
  background-color: #FFF;
  z-index: 100;
}

.mobile-search-wrap.search-open {
  transform: translate(0);
}

.clear-btn {
  font-size: 16px;
  border-radius: 50%;
  padding: 4px;
  margin-right: 6px;
  cursor: pointer;
  visibility: hidden;
  @apply bg-gray-300;
}
.mobile-search-wrap .search-input:not(:placeholder-shown) + .clear-btn {
  visibility: visible;
}
</style>