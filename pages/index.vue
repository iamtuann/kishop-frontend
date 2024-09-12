<template>
  <div>
    <LayoutTopBanner/>
  </div>
  <div class="mt-6">
    <Suspense>
      <template #default>
        <LayoutTopNewProduct/>
      </template>
      <template #fallback>
        <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-x-4 md:gap-x-5 gap-y-5 mt-4">
          <SkeletonProductCard v-for="i in 4" :key="i" />
        </div>
      </template>
    </Suspense>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>

</style>