<template>
  <div class="py-5 flex gap-3 pr-3 border-b border-b-gray-300">
    <div 
      class="shrink-0"
      :class="size=='small' ? 'w-24': 'w-[160px]'"
    >
      <NuxtLink :to="`/products/${product.slug}/${product.variantId}`">
        <img :src="product.thumbnail" :alt="product.name + ' ' + product.variantName"
        class="w-full rounded-md">
      </NuxtLink>
    </div>

    <div class="grow mt-[2px]">
      <NuxtLink :to="`/products/${product.slug}/${product.variantId}`">
        <h4 class="font-semibold text-lg hover:underline mb-1" :class="{'leading-5': size=='small'}">
          {{ product.name }}
        </h4>
      </NuxtLink>
      <p :class="classText()">
        {{ product.variantName }}
      </p>
      <p :class="classText()">
        Size: {{ product.size }}
      </p>

      <p v-if="!hideQuantity" :class="classText()">
        Số lượng: {{ product.quantity }}
      </p>
      <div v-if="!hideActions" class="mt-2">
        <div class="mb-2 flex">
          <button type="button" :disabled="product.quantity == 1" class="act-btn minus-btn disabled:text-gray-300" 
            @click="handleMinusQuantity">-</button>
          <span class="quantity">{{ product.quantity }}</span>
          <button type="button" class="act-btn plus-btn"
            @click="handlePlusQuantity">+</button>
        </div>
        <div class="flex items-center py-1">
          <div class="inline-flex mx-2 relative">
            <button type="button" class="favorite-btn">
              <i class="fa-regular fa-heart fa-lg"></i>
            </button>
            <div class="tooltip favorite">Thêm vào yêu thích</div>
          </div>
          <div class="inline-flex mx-2 cursor-pointer relative">
            <button type="button" class="delete-btn"
              @click="cartStore.removeProductInCart(product.detailId)">
              <i class="fa-regular fa-trash fa-lg"></i>
            </button>
            <div class="tooltip delete">Xóa khỏi giỏ hàng</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <h4 class="font-semibold text-lg">{{ strPrice }}</h4>
      <p v-if="isSale" class="font-medium text-sm line-through text-gray-400 float-right">{{ strOldPrice }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CartItemDetail } from "~/types";
import { formatPrice } from "@/utils"

type Size = "default" | "small";

const props = defineProps({
  product: { type: Object as PropType<CartItemDetail>  , required: true },
  hideActions: { type: Boolean },
  hideQuantity: { type: Boolean },
  size: { type: String as PropType<Size> }
})

const cartStore = useCartStore();
const isSale: Ref<boolean> = ref(false)

const { product } = toRefs(props);
isSale.value = product.value.price < product.value.oldPrice;

const strPrice: Ref<string> = computed(() => {
  return formatPrice(product.value.totalPrice);
})
const strOldPrice: Ref<string> = computed(() => {
  return formatPrice(product.value.totalOldPrice);
})

function classText() {
  if (props.size == 'small') {
    return 'text-gray-500 text-[14px] leading-5';
  } else {
    return 'text-gray-500'
  }
}

async function handleMinusQuantity() {
  product.value.quantity--;
  if (product.value.quantity == 0) {
    await cartStore.removeProductInCart(product.value.detailId);
  } else {
    await cartStore.updateDateCartItem(product.value.detailId, product.value.quantity);
  }
}

async function handlePlusQuantity() {
  product.value.quantity++;
  await cartStore.updateDateCartItem(product.value.detailId, product.value.quantity);
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