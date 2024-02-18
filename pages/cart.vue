<template>
  <div class="container mx-auto pt-10">
    <div class="grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-8">
        <h3 class="text-xl font-medium ">Giỏ hàng</h3>
        <CartItem v-for="product in listProductInCart" :key="product.quantityId" :product="product" />
      </div>
      <div class="col-span-12 md:col-span-4">
        <h3 class="text-xl font-medium ">Thanh toán</h3>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ProductDetail } from '~/types';
const listProductInCart: Ref<ProductDetail[] | []> = ref([
 {
  id: 9,
  variantId: 43,
  quantityId: 27,
  name: "Adidas samba OG",
  variantName: "Trắng sọc đen",
  slug: "adidas-samba-og",
  color: "Trắng",
  size: "L",
  status: 1,
  brand: "Adidas",
  thumbnail: "http://localhost:8081/resources/adidas-samba-og-preview-Samba_OG_Shoes.jpg",
  price: 450000,
  oldPrice: 500000,
  quantity: 1,
 }
])
</script>

<style scoped>

</style>