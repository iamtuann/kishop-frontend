<template>
  <div class="card-wrapper">
    <NuxtLink :to="`/products/${product.slug}${product.detailId ? '/' + product.detailId : ''}`">
      <div class="overflow-hidden relative">
        <img class="pd-img aspect-square object-cover duration-200 bg-gray-400" :src="product.thumbnail" :alt="product.name">
        <span v-if="isSale" class="absolute z-10 top-2 left-2 px-3 py-[6px] font-bold rounded-full text-sm bg-white text-red-600">{{ offPercent }}</span>
      </div>
    </NuxtLink>
    <div class="py-3 card-body">
      <NuxtLink :to="`/products/${product.slug}${product.detailId ? '/'+product.detailId : ''}`">
        <h4 class="font-semibold mb-1">{{ product.name }}</h4>
        <p class="description mb-2 text-gray-500">{{ product.description }}</p>
        <div class="mb-2">
          <span class="font-semibold text-red-700" v-if="isSale">{{ strPrice }}</span>
          <span class="font-semibold" :class="isSale ? 'line-through text-gray-400 text-sm ms-2' : ''">{{ strOldPrice }}</span>
        </div>
      </NuxtLink>
      <button class="btn-small">Add to cart</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductBasic } from "~/types";
  const props = defineProps({
    product: { type: Object as () => ProductBasic , required: true }
  })
  const product = props.product;
  const isSale = product.price < product.oldPrice;
  const formatter = new Intl.NumberFormat('en-US');
  const strOldPrice = formatter.format(product.oldPrice) + '₫';
  const strPrice = isSale ? formatter.format(product.price) + '₫' : '';
  const offPercent = isSale ? '-' + Math.round((1 - product.price / product.oldPrice) * 100)  + "%" : ''
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
.pd-img {
  width: 100%;
  max-height: 300px;
}
.card-wrapper:hover .pd-img {
  transform: scale(1.08);
}
.card-body {
  min-height: 145px;
}
</style>