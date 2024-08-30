<template>
  <CartItem
    v-if="itemSize == 'default'"
    v-for="product in cartStore.cartItemDetails"
    :key="product.detailId"
    :product="product"
    hide-quantity  
  />
  <CartItem
    v-if="itemSize == 'small'"
    v-for="product in cartStore.cartItemDetails"
    :key="product.detailId"
    :product="product"
    hide-actions
    size="small"
  />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
type Size = "default" | "small";

const props = defineProps({
  itemSize: { type: String as PropType<Size>, required: false, default: 'default' },
})
const authStore = useAuthStore();
const {isAuthenticated} = storeToRefs(authStore);
const cartStore = useCartStore();

if (isAuthenticated.value) {
  await useAsyncData("get-cartItems", () => cartStore.getAuthCartItems());
}
onMounted(async () => {
  if (!isAuthenticated.value) {
    await cartStore.getCartItemsFromLocal();
  }
})

</script>

<style scoped>

</style>