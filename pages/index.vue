<template>
  <div>
    <LayoutTopBanner/>
  </div>
  <div class="mt-6">
    <LayoutOurCategory />
  </div>
</template>

<script setup lang="ts">
const config = useRuntimeConfig();
console.log("a");

console.log(config.public.BASE_URL);
</script>

<style scoped>

</style>