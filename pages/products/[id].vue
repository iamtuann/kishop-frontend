<template>
  <div>
    <p>Product detail for {{ id }}</p>
  </div>
</template>

<script setup lang="ts">
  const { id }= useRoute().params;

  definePageMeta({
    layout: "products"
  })
</script>

<style scoped>

</style>