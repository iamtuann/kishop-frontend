<template>
  <div class="search-wrap flex items-center bg-gray-100 font-sans">
    <input type="text" class="search-input flex-1 bg-transparent border-none outline-none text-sm text-gray-900 px-1" placeholder="Tìm kiếm sản phẩm">
    <span class="material-symbols-outlined default-style-icon cursor-pointer">search</span>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
.search-wrap {
  padding: 6px 12px;
  border-radius: 99px;
}
.search-input {
  width: 200px;
}
.search-input::placeholder {
  color: var(--text-color);
}
</style>