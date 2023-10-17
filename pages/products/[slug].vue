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
              <img class="w-full h-full rounded bg-gray-100" :src="url" :alt="product.name">
            </div>
          </div>
          <div class="rounded-lg overflow-hidden relative grow w-auto h-auto lg:w-[535px] lg:h-[600px] max-w-[535px]">
            <img :src="imageShowing" :alt="product.name" class="w-full h-full bg-gray-100 object-cover object-center">
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
          <h1 class="text-2xl font-medium font-['inter_var']">{{ product.name }}</h1>
          <div class="mb-2 mt-2 font-['Inter_Var']">
            <span class="font-semibold text-lg" v-if="productDetailShowing.offPrice">{{ strOffPrice }}</span>
            <span class="font-semibold" :class="productDetailShowing.offPrice ? 'line-through text-gray-400 ms-2' : ''">{{ strPrice }}</span>
            <span class="ml-2 font-semibold text-green-600">{{ offPercent }}</span>
          </div>
          <div class="mt-3 mb-4">
            <h4 class="font-medium font-['Inter_Var'] mb-2">Màu sắc</h4>
            <div class="flex gap-3">
              <div 
                class="input-wrap"
                v-for="productDetail in product.productDetails" :key="productDetail.id"
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
          <div class="my-3 font-['Inter_Var']">
            <div class="mb-2 flex justify-between">
              <h4 class="font-medium">Kích cỡ</h4>
              <h4 class="font-medium text-gray-500 cursor-pointer">Hướng dẫn</h4>
            </div>

            <div class="grid grid-cols-4 gap-2">
              <div v-for="productQuantity in productDetailShowing.productQuantities" :key="productQuantity.id"
                class="relative input-wrap"
              >
                <input 
                type="radio" :value="productQuantity.id"
                v-model="productQuantityId" 
                name="size" :id="productQuantity.size.name"
                >
                <label :for="productQuantity.size.name"
                  class="flex items-center justify-center h-12 cursor-pointer bg-white rounded border border-gray-300 font-medium"
                >
                {{ productQuantity.size.name }}
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { Product, ProductDetail } from "@/types";
  const { slug }= useRoute().params;

  definePageMeta({
    layout: "default"
  })
  
  let product : Product;
  let productDetailShowing:ProductDetail;
  let productQuantityId:number | null = null;
  let productDetailId:Ref<number> = ref(0);
  let imageShowing: Ref<string> = ref('');
  let imageShowIndex: Ref<number> = ref(0);

  product = {
    id: 1,
    name: "Air Force 1",
    slug: "air-force-1",
    description: "Lorem insput",
    status: 1,
    createdDate: new Date,
    updatedDate: new Date,
    brand: {
      id: 1,
      name: "Nike",
      origin: "Mỹ",
      description: ""
    },
    productDetails: [
      {
        id: 1,
        color: {
          id: 1, name: "Đen", description: "", colorCode: "#333"
        },
        price: 600000,
        offPrice: 550000,
        status: 1,
        imageUrls: [
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/455439ad-72b0-4afb-9cfd-5044b63af2e9/air-force-1-07-shoes-VWCc04.png",
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7b54b0d4-79a1-44a2-a2c0-01066bda877c/air-force-1-07-shoes-VWCc04.png",
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3010d407-c09e-4124-81c8-d84a955af273/air-force-1-07-shoes-VWCc04.png",
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a185a94c-818b-46ae-bd0b-d54e5834b907/air-force-1-07-shoes-VWCc04.png",
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e634b359-8d30-4720-b7fb-2769f9bb53fd/air-force-1-07-shoes-VWCc04.png"
        ],
        productQuantities: [
          {
            id: 1,
            size: {name: "Xl"},
            quantity: 100
          },
          {
            id: 2,
            size: {name: "M"},
            quantity: 100
          },
          {
            id: 3,
            size: {name: "S"},
            quantity: 100
          },
        ],
      },
      {
        id: 2,
        color: {
          id: 1, name: "Trắng", description: "", colorCode: "#ddd"
        },
        price: 620000,
        offPrice: 550000,
        status: 1,
        imageUrls: [
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/455439ad-72b0-4afb-9cfd-5044b63af2e9/air-force-1-07-shoes-VWCc04.png",
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/7b54b0d4-79a1-44a2-a2c0-01066bda877c/air-force-1-07-shoes-VWCc04.png",
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/3010d407-c09e-4124-81c8-d84a955af273/air-force-1-07-shoes-VWCc04.png",
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/a185a94c-818b-46ae-bd0b-d54e5834b907/air-force-1-07-shoes-VWCc04.png",
          "https://static.nike.com/a/images/t_PDP_1728_v1/f_auto,q_auto:eco/e634b359-8d30-4720-b7fb-2769f9bb53fd/air-force-1-07-shoes-VWCc04.png"
        ],
        productQuantities: [
          {
            id: 1,
            size: {name: "Xl"},
            quantity: 100
          },
          {
            id: 2,
            size: {name: "M"},
            quantity: 100
          },
          {
            id: 3,
            size: {name: "S"},
            quantity: 0
          },
          {
            id: 3,
            size: {name: "2XL"},
            quantity: 10
          },
        ],
      },
    ],
    productPreviewId: 1
  }
  
  productDetailShowing = product.productDetails.find(pd => pd.id = product.productPreviewId) || product.productDetails[0];
  imageShowing.value = productDetailShowing.imageUrls[0];

  const formatter = new Intl.NumberFormat('en-US');
  const strPrice = formatter.format(productDetailShowing.price) + '₫';
  const strOffPrice = productDetailShowing.offPrice ? formatter.format(productDetailShowing.offPrice) + '₫' : '';
  const offPercent = productDetailShowing.offPrice ? + Math.round((1 - productDetailShowing.offPrice / productDetailShowing.price) * 100)  + "% off" : '';
  productDetailId.value = productDetailShowing.id;

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
    productDetailShowing = product.productDetails.find(pd => pd.id == detailId)
    imageShowIndex.value = 0;
    productQuantityId = null;
    console.log(detailId);
    console.log(productQuantityId);
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