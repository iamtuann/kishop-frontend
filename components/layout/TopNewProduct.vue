<template>
  <div class="container mx-auto">
    <h2 class="section-title">Sản phẩm mới</h2>
    <div class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-2 gap-x-4 md:gap-x-5 gap-y-5 mt-4">
      <ProductCard 
        v-for="product in listTopProducts" :key="product.variantId" 
        :product="product"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ProductBasic, IResponse, IPage } from '~/types';

const listTopProducts: Ref<ProductBasic[]> = ref([])
  
const productStore = useProductStore();
const { data } = await useAsyncData<IPage<ProductBasic[]>>('topProduct', () => productStore.getTopNewProduct());
listTopProducts.value = data.value?.content || [];

</script>

<style scoped>

</style>