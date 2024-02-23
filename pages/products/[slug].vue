<template>
  <div class="h-14"></div>
  <div class="container mx-auto">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12 md:col-span-7 gap-4">
        <div class="flex gap-4 lg:mt-10 max-h-[600px] min-h-[455px] sticky top-8">
          <div class="flex flex-shrink-0 relative flex-col grow gap-2 max-w-[60px] h-full overflow-y-auto">
            <div 
              v-for="(url, idx) in productVariantShowing?.imageUrls" 
              :key="idx"
              class="relative w-full h-[60px] rounded cursor-pointer"
              @mouseover="imageShowIndex = idx"
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
      <div class="col-span-12 md:col-span-5">
        <div class="pt-1 pr-0 pl-0 lg:mt-10 lg:mr-2">
          <h1 class="text-2xl font-medium ">{{ product?.name }}</h1>
          <div class="mb-2 mt-2 ">
            <span class="font-semibold text-xl" v-if="isSale">{{ strPrice }}</span>
            <span class="font-semibold" :class="isSale ? 'line-through text-gray-400 ms-2' : 'text-xl'">{{ strOldPrice }}</span>
            <span class="ml-2 font-semibold text-green-600">{{ offPercent }}</span>
          </div>
          <div class="mt-3 mb-4">
            <div class="flex gap-3">
              <div 
                class="input-wrap"
                v-for="productVariant in product?.productVariants" :key="productVariant.id"
              >
                <input 
                type="radio" hidden :value="productVariant.id"
                v-model="productVariantId"
                :id="productVariant.id+''"
                >
                <label :for="productVariant.id+''" :title="productVariant.name || product?.name"
                  class="flex items-center justify-center p-[1px] cursor-pointer bg-white border border-gray-300 rounded-md overflow-hidden"
                >
                <img class="w-14 h-14" :src="productVariant.previewImage">
                </label>
              </div>
            </div>
            <h4 class="mt-2 text-sm">{{ productVariantShowing.name || "" }}</h4>
          </div>
          <div class="my-3 ">
            <div class="mb-2 flex justify-between">
              <h4 class="font-medium">Kích cỡ</h4>
              <h4 class="font-medium text-gray-500 cursor-pointer">Hướng dẫn</h4>
            </div>

            <div class="grid grid-cols-4 gap-2">
              <div v-for="productQuantity in productVariantShowing.productQuantities" :key="productQuantity.id"
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
import { IResponse, Product, ProductVariant } from "@/types";

  const route = useRoute();
  const router = useRouter();
  const productStore = useProductStore();
  const { slug } = useRoute().params as { slug: string };

  definePageMeta({
    layout: "default"
  })
  
  const product: Ref<Product | null> = ref(null);
  let productVariantShowing:ProductVariant;
  let productQuantityId: Ref<number | null> = ref(null);
  let productVariantId:Ref<number> = ref(0);
  let imageShowing: Ref<string> = ref('');
  let imageShowIndex: Ref<number> = ref(0);
  const isSale: Ref<boolean> = ref(false)
    
  const formatter = new Intl.NumberFormat('en-US');
  let strOldPrice: string = "";
  let strPrice: string = "";
  let offPercent = "";

  const { data } = await useAsyncData<IResponse<any>>('product', () => productStore.getProductBySlug(slug));
  product.value = data.value?.output
  
  if (product.value != null) {
    productVariantId.value = getVariantIdFromRoute() || product.value.productVariants[0].id;
    updateProductVariant();
  } else {
    await navigateTo('/404')
  }

  function prevImage() {
    if (imageShowIndex.value == 0) {
      imageShowIndex.value = productVariantShowing.imageUrls.length -1;
    } else {
      imageShowIndex.value--;
    }
  }
  function forwardImage() {
    if (imageShowIndex.value == productVariantShowing.imageUrls.length -1) {
      imageShowIndex.value = 0;
    } else {
      imageShowIndex.value++;
    }
  }
  function calculatePrice() {
    strOldPrice = formatter.format(productVariantShowing.oldPrice) + '₫';
    strPrice = isSale.value ? formatter.format(productVariantShowing.price) + '₫' : '';
    offPercent = isSale.value ? + Math.round((1 - productVariantShowing.price / productVariantShowing.oldPrice) * 100)  + "% off" : '';
  }
  function getVariantIdFromRoute() {
    const variantId = route.params.variantId;
    if (Array.isArray(variantId)) {
      return Number(variantId[0]);
    } else if (variantId) {
      return Number(variantId);
    } else {
      return null;
    }
  }
  function updateProductVariant() {
    productVariantShowing = product.value?.productVariants.find(pv => pv.id == productVariantId.value) || productVariantShowing;
    isSale.value = productVariantShowing.price < productVariantShowing.oldPrice;
    imageShowIndex.value = 0;
    imageShowing.value = productVariantShowing.imageUrls[imageShowIndex.value];
    productQuantityId.value = null;
    calculatePrice();
  }

  watch(productVariantId, (newId) => {
    router.replace({params: {variantId: newId}})
    updateProductVariant();
  })

  watch(imageShowIndex, (newVal) => {
    imageShowing.value = productVariantShowing.imageUrls[newVal];
  })
  
</script>

<style scoped>
.arrow-icon {
  font-variation-settings: 'FILL' 0, 'wght' 200, 'GRAD' 0, 'opsz' 20
}
.arrow {
  @apply inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-white select-none
}
.input-wrap input[type="radio"]:checked + label,
.input-wrap input[type="radio"]:hover + label {
  border: 1px solid rgb(17, 17, 17);
}
</style>