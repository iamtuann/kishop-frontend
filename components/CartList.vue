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

type Size = "default" | "small";

const props = defineProps({
  itemSize: { type: String as PropType<Size>, required: false, default: 'default' },
})
const cartStore = useCartStore();
await useAsyncData('productsOrder', () => cartStore.getCartItemsFromLocal());
</script>

<style scoped>

</style>