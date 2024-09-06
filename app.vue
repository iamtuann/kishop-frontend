<template>
  <Body
    class="antialiased duration-300 transition-colors text-gray-800 dark:text-gray-200 bg-white dark:bg-gray-950"
  >
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </Body>
</template>

<script setup lang="ts">
const cartStore = useCartStore();
const authStore = useAuthStore();
const {isAuthenticated} = storeToRefs(authStore);

if (isAuthenticated.value) {
  await useAsyncData("count-items", () => cartStore.countCartItemsAuth());
}
onMounted(async () => {
  if (!isAuthenticated.value) {
    cartStore.getCartItemsFromLocals();
  }
})

</script>

<style scoped>

</style>