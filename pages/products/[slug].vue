<template>
  <div class="h-14"></div>
  <div class="container mx-auto">
    <div class="grid grid-cols-12">
      <div class="col-span-7">
        <div class="flex gap-4 lg:mt-12 lg:mr-2 ps-12 max-h-[600px] min-h-[455px]">
          <div class="flex relative flex-col grow gap-2 max-w-[60px] h-full overflow-y-auto">
            <div 
              v-for="(url, id) in productDetailShowing?.imageUrls" 
              class="relative w-full h-[60px] rounded cursor-pointer"
              @mouseover="imageShowIndex = id"
            >
              <img class="w-full h-full rounded bg-gray-100 object-cover object-center" :src="url" :alt="product?.name">
            </div>
          </div>
          <div class="rounded-lg overflow-hidden relative grow w-auto h-auto lg:w-[535px] lg:h-[600px] max-w-[535px]">
            <img :src="imageShowing" :alt="product?.name" class="w-full h-full bg-gray-100 object-cover object-center">
            <div class="absolute flex bottom-3 right-4 gap-2">
              <div 
                class="arrow"
                @click="prevImage"
              >
                <span class="material-symbols-outlined arrow-icon">arrow_back_ios_new</span>
              </div>
              <div
                class="arrow"
                @click="forwardImage"
              >
                <span class="material-symbols-outlined arrow-icon">arrow_forward_ios</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-5">
        <div class="pt-1 pr-0 pl-0 lg:mt-12 lg:mr-2 lg:pr-12 lg:pl-6 ">
          <h1 class="text-2xl font-medium ">{{ product?.name }}</h1>
          <div class="mb-2 mt-2 ">
            <span class="font-semibold text-lg" v-if="productDetailShowing.offPrice">{{ strOffPrice }}</span>
            <span class="font-semibold" :class="productDetailShowing.offPrice ? 'line-through text-gray-400 ms-2' : ''">{{ strPrice }}</span>
            <span class="ml-2 font-semibold text-green-600">{{ offPercent }}</span>
          </div>
          <div class="mt-3 mb-4">
            <h4 class="font-medium  mb-2">Màu sắc</h4>
            <div class="flex gap-3">
              <div 
                class="input-wrap"
                v-for="productDetail in product?.productDetails" :key="productDetail.id"
              >
                <input 
                type="radio" hidden :value="productDetail.id"
                v-model="productDetailId"
                name="color" :id="productDetail.color.name"
                >
                <label :for="productDetail.color.name"
                  class="flex items-center justify-center p-[1px] cursor-pointer rounded-full bg-white border border-gray-300"
                >
                <div class="w-8 h-8 rounded-full" :style="{backgroundColor: productDetail.color.colorCode}"></div>
                </label>
              </div>
            </div>
          </div>
          <div class="my-3 ">
            <div class="mb-2 flex justify-between">
              <h4 class="font-medium">Kích cỡ</h4>
              <h4 class="font-medium text-gray-500 cursor-pointer">Hướng dẫn</h4>
            </div>

            <div class="grid grid-cols-4 gap-2">
              <div v-for="productQuantity in productDetailShowing.productQuantities" :key="productQuantity.id"
                class="relative input-wrap"
              >
                <input 
                type="radio" hidden :value="productQuantity.id"
                v-model="productQuantityId" 
                name="size" :id="productQuantity.size.name"
                :disabled="productQuantity.quantity == 0"
                >
                <label v-if="productQuantity.quantity > 0 " :for="productQuantity.size.name"
                  class="flex items-center justify-center h-12 cursor-pointer bg-white rounded border border-gray-300 font-medium"
                >
                {{ productQuantity.size.name }}
                </label>
                <label v-else :for="productQuantity.size.name"
                  class="flex items-center justify-center h-12 cursor-not-allowed rounded bg-gray-200 text-gray-400 border border-gray-300">
                {{ productQuantity.size.name }}
                </label>
              </div>
            </div>
          </div>

          <div class="mt-2 mb-4">
            <button class="btn-primary hover:bg-primary-600 transition-all">
              Thêm vào giỏ
            </button>
            <button class="btn-primary mt-3 bg-white border-gray-400 text-gray-800 hover:border-gray-800 transition-all">
              <span>Yêu thích</span>
              <span class="material-symbols-outlined arrow-icon ml-2">favorite</span>
            </button>
          </div>
          <div class="pt-6">
            <h4 class="font-medium mb-1">Mô tả sản phẩm</h4>
            <p>{{ product?.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { IResponse, Product, ProductDetail } from "@/types";

  const productStore = useProductStore();
  const { slug } = useRoute().params as { slug: string };

  definePageMeta({
    layout: "default"
  })
  
  const product: Ref<Product | null> = ref(null);
  let productDetailShowing:ProductDetail;
  let productQuantityId:number | null = null;
  let productDetailId:Ref<number> = ref(0);
  let imageShowing: Ref<string> = ref('');
  let imageShowIndex: Ref<number> = ref(0);
    
  const formatter = new Intl.NumberFormat('en-US');
  let strPrice: string = "";
  let strOffPrice: string = "";
  let offPercent = "";
  const { data } = await useAsyncData<IResponse<any>>('topProduct', () => productStore.getProductBySlug(slug));
  console.log(data.value);
  product.value = data.value?.output

  if (product.value != null) {
    productDetailShowing = product.value.productDetails.find(pd => pd.id == product.value?.productPreviewId) || product.value.productDetails[0];
    imageShowing.value = productDetailShowing.imageUrls[0];
    strPrice = formatter.format(productDetailShowing.price) + '₫';
    strOffPrice = productDetailShowing.offPrice ? formatter.format(productDetailShowing.offPrice) + '₫' : '';
    offPercent = productDetailShowing.offPrice ? + Math.round((1 - productDetailShowing.offPrice / productDetailShowing.price) * 100)  + "% off" : '';
    productDetailId.value = productDetailShowing.id;
  } else {
    await navigateTo('/404')
  }

  function prevImage() {
    if (imageShowIndex.value == 0) {
      imageShowIndex.value = productDetailShowing.imageUrls.length -1;
    } else {
      imageShowIndex.value--;
    }
  }
  function forwardImage() {
    if (imageShowIndex.value == productDetailShowing.imageUrls.length -1) {
      imageShowIndex.value = 0;
    } else {
      imageShowIndex.value++;
    }
  }

  watch(productDetailId, (detailId) => {
    productDetailShowing = product.value?.productDetails.find(pd => pd.id == detailId) || productDetailShowing;
    imageShowIndex.value = 0;
    imageShowing.value = productDetailShowing.imageUrls[imageShowIndex.value];
    productQuantityId = null;
  })

  watch(imageShowIndex, (newVal) => {
    imageShowing.value = productDetailShowing.imageUrls[newVal];
  })
  
</script>

<style scoped>
.arrow-icon {
  font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20
}
.arrow {
  @apply inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-white select-none
}
.input-wrap input[type="radio"]:checked + label{
  border: 1px solid rgb(17, 17, 17);
}
</style>