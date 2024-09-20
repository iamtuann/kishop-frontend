<template>
  <div class="h-14"></div>
  <div class="container mx-auto">
    <div class="grid grid-cols-12 gap-5">
      <div class="col-span-12 md:col-span-7 gap-4">
        <div class="flex flex-col-reverse sm:flex-row gap-4 max-h-[600px sticky top-8">
          <div class="custom-scroll flex flex-row sm:flex-col flex-shrink-0 gap-2 overflow-auto">
            <div 
              v-for="(url, idx) in productVariantShowing?.imageUrls" 
              :key="idx"
              class="relative aspect-square h-20 md:max-lg:h-16 rounded cursor-pointer"
              @mouseover="imageShowIndex = idx"
            >
              <img class="h-full w-full rounded bg-gray-100 object-cover object-center" :src="url" :alt="product?.name">
            </div>
          </div>
          <div class="rounded-lg overflow-hidden relative grow w-auto h-auto lg:h-[600px]">
            <img :src="imageShowing" :alt="product?.name" class="w-full h-full bg-gray-100 object-cover object-center">
            <div class="absolute flex bottom-3 right-4 gap-2">
              <div class="arrow" @click="prevImage">
                <i class="fa-regular fa-chevron-left"></i>
              </div>
              <div class="arrow" @click="forwardImage">
                <i class="fa-regular fa-chevron-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-span-12 md:col-span-5">
        <div class="pt-1 pr-0 pl-0 lg:mt-5 lg:mr-2">
          <span class="font-semibold text-red-600 uppercase">{{ product?.brand.name }}</span>
          <h1 class="text-2xl font-medium mt-2">{{ product?.name }}</h1>
          <div class="mb-2 mt-2 ">
            <span class="font-semibold text-xl">{{ strPrice }}</span>
            <span v-if="isSale" class="font-semibold line-through text-gray-400 ms-2">{{ strOldPrice }}</span>
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
                :id="productVariant.id.toString()"
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
          <div class="my-3">
            <div class="mb-2 flex justify-between">
              <h4 class="font-medium">Kích cỡ</h4>
              <h4 class="font-medium text-gray-500 cursor-pointer">Hướng dẫn</h4>
            </div>

            <div class="grid grid-cols-4 gap-2" :class="{'size-error': !isSelectSize}">
              <div v-for="productDetail in productVariantShowing.productDetails" :key="productDetail.id"
                class="relative input-wrap"
              >
                <input 
                  type="radio" hidden :value="productDetail.id"
                  v-model="productDetailId" 
                  name="size" :id="productDetail.size.name"
                  :disabled="productDetail.quantity == 0"
                >
                <label v-if="productDetail.quantity > 0 " :for="productDetail.size.name"
                  class="flex items-center justify-center h-12 cursor-pointer bg-white rounded border border-gray-300 font-medium"
                >
                  {{ productDetail.size.name }}
                </label>
                <label v-else :for="productDetail.size.name"
                  class="flex items-center justify-center h-12 cursor-not-allowed rounded bg-gray-200 text-gray-400 border border-gray-300">
                  {{ productDetail.size.name }}
                </label>
              </div>
            </div>

            <div v-show="!isSelectSize" class="text-red-700 mt-2 text-sm">Vui lòng chọn một kích cỡ</div>
          </div>

          <div class="mt-2 mb-4">
            <CartButton 
              :is-adding="isAddingToCart" :is-added="isAddedToCart" 
              @click="handleAddToCart"
              @ended="isAddedToCart = false"
            />
            <!-- <button class="btn-primary mt-3 bg-white border-gray-400 text-gray-800 hover:border-gray-800 transition-all">
              <span>Yêu thích</span>
              <i class="ml-2 fa-light fa-heart"></i>
            </button> -->
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
import { formatPrice } from "@/utils"

  const route = useRoute();
  const router = useRouter();
  const productStore = useProductStore();
  const { slug } = useRoute().params as { slug: string };
  const cartStore = useCartStore()

  definePageMeta({
    layout: "default"
  })
  
  const product: Ref<Product | null> = ref(null);
  let productVariantShowing:ProductVariant;
  let productDetailId: Ref<number | null> = ref(null);
  let productVariantId:Ref<number> = ref(0);
  let imageShowing: Ref<string> = ref('');
  let imageShowIndex: Ref<number> = ref(0);
  const isSale: Ref<boolean> = ref(false);
  const isSelectSize: Ref<boolean> = ref(true);

  const isAddingToCart: Ref<boolean> = ref(false)
  const isAddedToCart: Ref<boolean> = ref(false)
  const delayAddToCart = 1000;

  const strPrice: Ref<string> = computed(() => {
    return formatPrice(productVariantShowing.price);;
  })
  const strOldPrice: Ref<string> = computed(() => {
    return formatPrice(productVariantShowing.oldPrice);;
  })
  const offPercent: Ref<string> = computed(() => {
    return isSale.value ? + Math.round((1 - productVariantShowing.price / productVariantShowing.oldPrice) * 100)  + "% off" : '';
  })

  const { data } = await useAsyncData<IResponse<any>>(`product-${slug}`, () => productStore.getProductBySlug(slug));
  product.value = data.value?.output
  
  if (product.value != null) {
    productVariantId.value = getVariantIdFromRoute() || product.value.productVariants[0].id;
    updateProductVariant();
  } else {
    await navigateTo('/404')
  }

  //handle slide image
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

  watch(imageShowIndex, (newVal) => {
    imageShowing.value = productVariantShowing.imageUrls[newVal];
  })

  //handle product variant
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
    productDetailId.value = null;
  }
  
  watch(productVariantId, (newId) => {
    router.replace({params: {variantId: newId}})
    updateProductVariant();
  })

  //quantity
  watch(productDetailId, (newQtyId) => {
    if (newQtyId) {
      isSelectSize.value = true;
    }
  })

  //add to cart
  async function handleAddToCart() {
    if (isAddingToCart.value) {
      return;
    }
    if (productDetailId.value) {
      isSelectSize.value = true;
      isAddedToCart.value = false;
      isAddingToCart.value = true;
      await Promise.all([addToCart(productDetailId.value), delay(delayAddToCart)]);
      isAddingToCart.value = false;
      isAddedToCart.value = true;
    } else {
      isSelectSize.value = false;
    }
  }

  async function addToCart(detailId: number) {
    cartStore.addProductToCart(detailId);
  }

  function delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
</script>

<style scoped>
.arrow {
  @apply inline-flex items-center justify-center w-8 h-8 rounded-full cursor-pointer bg-white select-none
}
.input-wrap input[type="radio"]:checked + label,
.input-wrap input[type="radio"]:hover + label {
  border: 1px solid rgb(17, 17, 17);
}
.size-error {
  box-shadow: rgb(212, 63, 33) 0px 0px 0px 1px;
  padding: 1px;
  border-radius: 4px;
}
.custom-scroll::-webkit-scrollbar-track
{
	background-color: transparent
}

.custom-scroll::-webkit-scrollbar
{
	width: 4px;
}

.custom-scroll::-webkit-scrollbar-thumb
{
  background-color: transparent;
  border-radius: 99px;
}
</style>