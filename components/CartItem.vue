<template>
  <div class="py-5 flex gap-4 pr-3 border-b border-b-gray-300">
    <div class="w-[160px] shrink-0">
      <NuxtLink :to="`/products/${product.slug}/${product.variantId}`">
        <img :src="product.thumbnail" :alt="product.name + ' ' + product.variantName"
        class="w-full rounded-md">
      </NuxtLink>
    </div>
    <div class="grow">
      <div class="flex justify-between">
        <NuxtLink :to="`/products/${product.slug}/${product.variantId}`">
          <h4 class="font-semibold text-lg hover:underline">{{ product.name }}</h4>
        </NuxtLink>
        <h4 class="font-semibold">{{ strPrice }}</h4>
      </div>
      <div class="flex justify-between">
        <p class="description mb-1 text-gray-500">Loại: {{ product.variantName }}</p>
        <h4 v-if="isSale" class="font-medium text-sm line-through text-gray-400">{{ strOldPrice }}</h4>
      </div>
      <p class="mb-1 text-gray-500">Size: {{ product.size }}</p>
      <p class="mb-2 flex">
        <button type="button" :disabled="product.quantityOrder == 1" class="act-btn minus-btn disabled:text-gray-300" 
          @click="handleMinusQuantity">-</button>
        <span class="quantity">{{ product.quantityOrder }}</span>
        <button type="button" class="act-btn plus-btn"
          @click="handlePlusQuantity">+</button>
      </p>
      <div class="flex items-center py-1">
        <div class="inline-flex mx-2 relative">
          <button type="button" class="material-symbols-outlined normal-style-icon favorite-btn">favorite</button>
          <div class="tooltip favorite">Thêm vào yêu thích</div>
        </div>
        <div class="inline-flex mx-2 cursor-pointer relative">
          <button type="button" class="material-symbols-outlined normal-style-icon delete-btn"
          @click="cartStore.removeProductInCart(product.quantityId)">delete</button>
          <div class="tooltip delete">Xóa khỏi giỏ hàng</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductDetail } from "~/types";
import { formatPrice } from "@/utils"

const props = defineProps({
  product: { type: Object as () => ProductDetail , required: true }
})

const cartStore = useCartStore();
const isSale: Ref<boolean> = ref(false)

const product = toRef(props.product);
isSale.value = product.value.price < product.value.oldPrice;
const formatter = new Intl.NumberFormat('en-US');

const strPrice: Ref<string> = computed(() => {
  return formatPrice(product.value.totalPrice);
})
const strOldPrice: Ref<string> = computed(() => {
  return formatPrice(product.value.totalOldPrice);
})


async function handleMinusQuantity() {
  product.value.quantityOrder--;
  if (product.value.quantityOrder == 0) {
    await cartStore.removeProductInCart(product.value.quantityId);
  } else {
    await cartStore.updateDateQuantyProduct(product.value.quantityId, product.value.quantityOrder);
  }
}

async function handlePlusQuantity() {
  product.value.quantityOrder++;
  await cartStore.updateDateQuantyProduct(product.value.quantityId, product.value.quantityOrder);
}
</script>

<style scoped>
.act-btn {
  border: 1px solid;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 600;
  line-height: 1;
  @apply border-gray-700
}
.act-btn.minus-btn {
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}
.act-btn.plus-btn {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}
.quantity {
  border-top: 1px solid;
  border-bottom: 1px solid;
  width: 32px;
  height: 32px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  line-height: 1;
  @apply border-gray-700
}
.tooltip {
  position: absolute;
  top: -130%;
  display: block;
  width: max-content;
  z-index: -1;
  background-color: #fff;
  padding: 2px 6px;
  font-size: 14px;
  border-radius: 4px;
  border: 1px solid;
  opacity: 0;
  transition: all linear 0.1s;
  transform-origin: center;
  @apply border-gray-400 bg-gray-100
}
.tooltip.favorite {
  left: -55px;
}
.tooltip.delete {
  left: -50px;
}
.favorite-btn:hover + .tooltip.favorite {
  opacity: 1;
  z-index: 2;
}
.delete-btn:hover + .tooltip.delete {
  opacity: 1;
  z-index: 2;
}
</style>