<template>
  <CartItem
    v-if="props.itemSize == 'default'"
    v-for="product in props.cartItems"
    :key="product.detailId"
    :product="product"
    hide-quantity  
  />
  <CartItem
    v-if="props.itemSize == 'small'"
    v-for="product in props.cartItems"
    :key="product.detailId"
    :product="product"
    hide-actions
    size="small"
  />
</template>

<script setup lang="ts">
import { CartItemDetail } from "~/types";
type Size = "default" | "small";

const props = defineProps({
  itemSize: { type: String as PropType<Size>, required: false, default: 'default' },
  cartItems: { type: Object as PropType<CartItemDetail[]> },
})

</script>

<style scoped>

</style>