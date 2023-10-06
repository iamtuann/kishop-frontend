<template>
  <div class="card-wrapper">
    <NuxtLink to="#">
      <div class="overflow-hidden relative">
        <img class="pd-img aspect-square object-cover duration-200 bg-gray-400" :src="product.thumbnail" :alt="product.name">
        <span v-if="product.offPrice" class="absolute z-10 top-2 left-2 px-3 py-[6px] font-bold rounded-full text-sm bg-white text-red-600 font-['Inter_Var']">{{ offPercent }}</span>
      </div>
    </NuxtLink>
    <div class="py-3 card-body">
      <NuxtLink to="#">
        <h4 class="font-semibold mb-1">{{ product.name }}</h4>
        <p class="description mb-2 font-['Inter_Var'] text-gray-500">{{ product.description }}</p>
        <div class="mb-2">
          <span class="font-semibold font-['Inter_Var'] text-red-700" v-if="product.offPrice">{{ strOffPrice }}</span>
          <span class="font-semibold font-['Inter_Var']" :class="product.offPrice ? 'line-through text-gray-400 text-sm ms-2' : ''">{{ strPrice }}</span>
        </div>
      </NuxtLink>
      <button class="btn">Add to cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductBasic } from "~/types";
  const props = defineProps({
    product: { type: Object as () => ProductBasic , required: true }
  })
  const product = props.product;
  const formatter = new Intl.NumberFormat('en-US');
  const strPrice = formatter.format(product.price) + '₫';
  const strOffPrice = product.offPrice ? formatter.format(product.offPrice) + '₫' : '';
  const offPercent = product.offPrice ? '-' + Math.round((1 - product.offPrice / product.price) * 100)  + "%" : ''
</script>

<style scoped>
.description {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 22px;
}
.card-wrapper:hover .pd-img {
  transform: scale(1.08);
}
.card-body {
  min-height: 145px;
}
</style>