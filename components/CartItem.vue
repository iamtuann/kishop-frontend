<template>
  <div class="py-3 md:py-5 flex gap-3 pr-3 border-b border-b-gray-300">
    <div 
      class="shrink-0"
      :class="size=='small' ? 'w-24': 'w-32  md:w-40'"
    >
      <NuxtLink :to="`/products/${product.slug}/${product.variantId}`">
        <img :src="product.thumbnail" :alt="product.name + ' ' + product.variantName"
        class="w-full rounded-md">
      </NuxtLink>
    </div>

    <div class="grow flex flex-col-reverse sm:flex-row">
      <div class="grow mt-[2px]">
        <NuxtLink :to="`/products/${product.slug}/${product.variantId}`">
          <h4 class="font-semibold sm:text-lg sm:leading-6 hover:underline md:mb-1" :class="{'leading-5': size=='small'}">
            {{ product.name }}
          </h4>
        </NuxtLink>
        <div class="flex md:flex-col gap-x-4">
          <p :class="classText()">
            {{ product.variantName }}
          </p>
          <p :class="classText()">
            Size: {{ product.size }}
          </p>
        </div>
  
        <p v-if="!hideQuantity" :class="classText()">
          Số lượng: {{ product.quantity }}
        </p>
        <div v-if="!hideActions" class="mt-2 flex sm:flex-col gap-y-2 justify-between sm:items-start items-center ">
          <div class="flex">
            <button type="button" :disabled="product.quantity == 1" class="act-btn minus-btn disabled:text-gray-300" 
              @click="handleMinusQuantity">-</button>
            <span class="quantity">{{ product.quantity }}</span>
            <button type="button" class="act-btn plus-btn"
              @click="handlePlusQuantity">+</button>
          </div>
          <div class="flex items-center py-1">
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
      <div class="font-semibold">
        <h4 class="sm:text-lg leading-5">{{ strPrice }}</h4>
        <p v-if="isSale" class="hidden sm:block float-right text-sm line-through text-gray-400">{{ strOldPrice }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ItemDetail } from "~/types";
import { formatPrice } from "@/utils"

type Size = "default" | "small";

const props = defineProps({
  product: { type: Object as PropType<ItemDetail>  , required: true },
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
  display: none;
  transition: all linear 0.1s;
  transform-origin: center;
  @apply border-gray-400 bg-gray-100
}
.tooltip.delete {
  left: -50px;
}
.favorite-btn:hover + .tooltip.favorite {
  display: block;
  z-index: 2;
}
.delete-btn:hover + .tooltip.delete {
  display: block;
  z-index: 2;
}
</style>