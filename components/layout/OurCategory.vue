<template>
  <div class="container mx-auto">
    <h2 class="section-title">Danh mục sản phẩm</h2>
    <div class="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-x-4 md:gap-x-5 gap-y-5 mt-4">
      <ProductCard :product="demo"/>
      <ProductCard :product="demo"/>
      <ProductCard :product="demo"/>
      <ProductCard :product="demo"/>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductBasic } from '~/types';

  let demo: ProductBasic = {
    id: 1,
    name: "Nike air force 1",
    createdDate: new Date,
    price: 6000000,
    offPrice: 5500000,
    thumbnail: 'https://product.hstatic.net/200000532469/product/nike-air-force-1-low-brooklyn-cream_3152ed5887d040bb80e185afe7313458_master.jpg',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam necessitatibus nisi eligendi eius iste doloribus amet distinctio ipsa adipisci in.',
    brand: 'Nike'
  }
</script>

<style scoped>

</style>