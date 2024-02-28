<template>
  <CartItem v-for="product in cartStore.listProductDetail" :key="product.quantityId" :product="product" />
</template>

<script setup lang="ts">
const cartStore = useCartStore();
await useAsyncData('productsOrder', () => cartStore.getProductsDetailOrdered());
</script>

<style scoped>

</style>