<template>
  <div class="container mx-auto mt-6">
    <div class="flex flex-col sm:flex-row items-start justify-between sm:items-center gap-4 pb-4">
      <h2 class="text-2xl font-semibold italic">
        {{ title }}
        {{ route.params.category == "search" ? keyword : '' }}
        ({{ pageProduct?.totalElements }})
      </h2>
        <Select 
          v-model="sortingSelected"
          class="hidden lg:block w-[200px]"
          name="filter"
          :items="listSorting"
          item-title="name"
          return-object
        />
        <button @click="pageStates.isOpenFilter = true" class="block lg:hidden btn-small px-5 text-base">
          Bộ lọc
          <i class="ml-1 fa-regular fa-bars-filter"></i>
        </button>
    </div>
    <div class="grid grid-cols-12 gap-4 mt-4">
      <div class="hidden lg:block lg:col-span-3 2xl:col-span-2 pr-4">
        <div class="cate-item !border-t-0">
          <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
            @click="pageStates.isOpenCate = !pageStates.isOpenCate"
          >
            <div class="text-base font-semibold">Loại sản phẩm</div>
            <div class="arrow-icon" :class="{open: pageStates.isOpenCate}">
              <span class="left"></span>
              <span class="right"></span>
            </div>
          </div>
          <div :class="{open: pageStates.isOpenCate}" class="cate-body">
            <label v-for="cate in listCate" :key="cate.id" class="checkbox mb-2 font-medium">
              <input type="checkbox" v-model="listCateSelected" :value="cate.slug">
              {{ cate.name }}
            </label>
          </div>
        </div>
        <div class="cate-item" v-if="!pageStates.isPageGender">
          <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
            @click="pageStates.isOpenGender = !pageStates.isOpenGender"
          >
            <div class="text-base font-semibold">Giới tính</div>
            <div class="arrow-icon" :class="{open: pageStates.isOpenGender}">
              <span class="left"></span>
              <span class="right"></span>
            </div>
          </div>
          <div :class="{open: pageStates.isOpenGender}" class="cate-body">
            <label v-for="gender in listGender" :key="gender" class="checkbox mb-2 font-medium">
              <input type="checkbox" v-model="listGenderSelected" :value="gender">
              {{ gender }}
            </label>
          </div>
        </div>
        <div class="cate-item" v-if="!pageStates.isPageSale" >
          <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
            @click="pageStates.isOpenSale = !pageStates.isOpenSale"
          >
            <div class="text-base font-semibold">Giảm giá</div>
            <div class="arrow-icon" :class="{open: pageStates.isOpenSale}">
              <span class="left"></span>
              <span class="right"></span>
            </div>
          </div>
          <div :class="{open: pageStates.isOpenSale}" class="cate-body">
            <label class="checkbox mb-2 font-medium">
              <input type="checkbox" v-model="isSale">Giảm giá
            </label>
          </div>
        </div>
        <div class="cate-item">
          <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
            @click="pageStates.isOpenColor = !pageStates.isOpenColor"
          >
            <div class="text-base font-semibold">Màu sắc</div>
            <div class="arrow-icon" :class="{open: pageStates.isOpenColor}">
              <span class="left"></span>
              <span class="right"></span>
            </div>
          </div>
          <div :class="{open: pageStates.isOpenColor}" class="cate-body grid grid-cols-3 gap-y-3">
            <label class="cursor-pointer flex flex-col items-center select-none" v-for="color in listColor" :key="color.id">
              <input type="checkbox" v-model="listColorSelected" :value="color.engName" class="hide checkbox-color">
              <div class="w-7 h-7 rounded-full mb-1 color-wrap grid place-content-center"
                :class="color.engName == 'White' ? 'color-white' : ''"
                :style="{backgroundColor: color.code}"></div>
                <div class="text-xs font-medium text-center">{{ color.name }}</div>
            </label>
          </div>
        </div>
        <div class="cate-item">
          <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
            @click="pageStates.isOpenBrand = !pageStates.isOpenBrand"
          >
            <div class="text-base font-semibold">Hãng</div>
            <div class="arrow-icon" :class="{open: pageStates.isOpenBrand}">
              <span class="left"></span>
              <span class="right"></span>
            </div>
          </div>
          <div :class="{open: pageStates.isOpenBrand}" class="cate-body">
            <label v-for="brand in listBrand" :key="brand.id" class="checkbox mb-2 font-medium">
              <input type="checkbox" v-model="listBrandSelected" :value="brand.name">
              {{ brand.name }}
            </label>
          </div>
        </div>
      </div>
      <div class="col-span-12 lg:col-span-9 2xl:col-span-10">
        <div class="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-4">
          <SkeletonProductCard
            v-if="pending"
            v-for="count in 12" :key="count"
          />
          <ProductCard 
            v-else
            v-for="product in pageProduct?.content" :key="product.variantId" 
            :product="product"
          />
        </div>
      </div>
    </div>

    <!-- filter mobile -->
    <Transition>
      <div v-show="pageStates.isOpenFilter" class="fixed bg-white lg:hidden pt-3 filter-mobile">
        <div class="flex flex-col h-full">
          <div class="flex-grow flex-shrink h-full bg-white overflow-y-auto">
            <p class="py-2 px-3 md:py-4 md:px-6 font-medium">Bộ lọc</p>
            <button class="fixed top-5 right-6 z-50 text-2xl px-1 cursor-pointer" @click="pageStates.isOpenFilter = !pageStates.isOpenFilter">
              <i class="fa-regular fa-xmark"></i>
            </button>
            <div class="py-4 px-3 md:px-6">
              <div class="text-base font-semibold">Sắp xếp</div>
              <Select 
                v-model="sortingSelected"
                class="!font-medium"
                :items="listSorting"
                item-title="name"
                return-object
              />
              <div class="cate-item">
                <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
                  @click="pageStates.isOpenCate = !pageStates.isOpenCate"
                >
                  <div class="text-base font-semibold">Loại sản phẩm</div>
                  <div class="arrow-icon" :class="{open: pageStates.isOpenCate}">
                    <span class="left"></span>
                    <span class="right"></span>
                  </div>
                </div>
                <div :class="{open: pageStates.isOpenCate}" class="cate-body">
                  <label v-for="cate in listCate" :key="cate.id" class="checkbox mb-2 font-medium">
                    <input type="checkbox" v-model="listCateSelected" :value="cate.slug">
                    {{ cate.name }}
                  </label>
                </div>
              </div>
              <div class="cate-item" v-if="!pageStates.isPageGender">
                <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
                  @click="pageStates.isOpenGender = !pageStates.isOpenGender"
                >
                  <div class="text-base font-semibold">Giới tính</div>
                  <div class="arrow-icon" :class="{open: pageStates.isOpenGender}">
                    <span class="left"></span>
                    <span class="right"></span>
                  </div>
                </div>
                <div :class="{open: pageStates.isOpenGender}" class="cate-body">
                  <label v-for="gender in listGender" :key="gender" class="checkbox mb-2 font-medium">
                    <input type="checkbox" v-model="listGenderSelected" :value="gender">
                    {{ gender }}
                  </label>
                </div>
              </div>
              <div class="cate-item" v-if="!pageStates.isPageSale" >
                <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
                  @click="pageStates.isOpenSale = !pageStates.isOpenSale"
                >
                  <div class="text-base font-semibold">Giảm giá</div>
                  <div class="arrow-icon" :class="{open: pageStates.isOpenSale}">
                    <span class="left"></span>
                    <span class="right"></span>
                  </div>
                </div>
                <div :class="{open: pageStates.isOpenSale}" class="cate-body">
                  <label class="checkbox mb-2 font-medium">
                    <input type="checkbox" v-model="isSale">Giảm giá
                  </label>
                </div>
              </div>
              <div class="cate-item">
                <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
                  @click="pageStates.isOpenColor = !pageStates.isOpenColor"
                >
                  <div class="text-base font-semibold">Màu sắc</div>
                  <div class="arrow-icon" :class="{open: pageStates.isOpenColor}">
                    <span class="left"></span>
                    <span class="right"></span>
                  </div>
                </div>
                <div :class="{open: pageStates.isOpenColor}" class="cate-body grid grid-cols-3 gap-y-3">
                  <label class="cursor-pointer flex flex-col items-center select-none" v-for="color in listColor" :key="color.id">
                    <input type="checkbox" v-model="listColorSelected" :value="color.engName" class="hide checkbox-color">
                    <div class="w-7 h-7 rounded-full mb-1 color-wrap grid place-content-center"
                      :class="color.engName == 'White' ? 'color-white' : ''"
                      :style="{backgroundColor: color.code}"></div>
                      <div class="text-xs font-medium text-center">{{ color.name }}</div>
                  </label>
                </div>
              </div>
              <div class="cate-item">
                <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
                  @click="pageStates.isOpenBrand = !pageStates.isOpenBrand"
                >
                  <div class="text-base font-semibold">Hãng</div>
                  <div class="arrow-icon" :class="{open: pageStates.isOpenBrand}">
                    <span class="left"></span>
                    <span class="right"></span>
                  </div>
                </div>
                <div :class="{open: pageStates.isOpenBrand}" class="cate-body">
                  <label v-for="brand in listBrand" :key="brand.id" class="checkbox mb-2 font-medium">
                    <input type="checkbox" v-model="listBrandSelected" :value="brand.name">
                    {{ brand.name }}
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div class="h-auto py-4 px-3 md:px-6 border-t border-gray-300">
            <button @click="pageStates.isOpenFilter = !pageStates.isOpenFilter" class="py-3 btn-primary">Áp dụng</button>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '~/stores';
import { Brand, Category, Color, ProductBasic, IPage } from '~/types';

definePageMeta({
  validate({ params }) {
    const validCategories = ['men', 'women', 'kids', 'flash-sale', 'search'];
    const category = Array.isArray(params.category) ? params.category[0] : params.category;
    return validCategories.includes(category);
  }
});

const router = useRouter()
const route = useRoute()
const productStore = useProductStore();
const commonStore = useCommonStore();

const pageStates = reactive({
  isOpenCate: true,
  isOpenSale: true,
  isOpenColor: true,
  isOpenBrand: true,
  isOpenGender: true,
  isResetFilter: false,
  isPageGender: false,
  isPageSale: false,
  isOpenFilter: false
})
const currentPage = ref(1);
const pageSize = ref(20);
const isSale = ref(false);
const listSorting = [
  {
    name: "Mặc định",
    sortingKey: null,
    orderBy: "asc"
  },
  {
    name: "Giá tăng dần",
    sortingKey: "price",
    orderBy: "asc"
  },
  {
    name: "Giá giảm dần",
    sortingKey: "price",
    orderBy: "desc"
  },
  {
    name: "Mới nhất",
    sortingKey: "createdDate",
    orderBy: "desc"
  },
  {
    name: "Bán chạy nhất",
    sortingKey: "sold",
    orderBy: "desc"
  },
]
const listGender = ["Nam", "Nữ", "Unisex", "Trẻ em"]

const sortingSelected = ref(listSorting[0])
const keyword = computed(() => {
  if (route.query.q) {
    return route.query.q.toString();
  } else {
    return "";
  }
});
const listCateSelected: Ref<string[]> = ref([]);
const listColorSelected: Ref<string[]> = ref([]);
const listBrandSelected: Ref<string[]> = ref([]);
const listGenderSelected: Ref<string[]> = ref([]);

const { data: listBrand } = useAsyncData<Brand[]>('brands', () => commonStore.getAllBrands());
const { data: listColor } = useAsyncData<Color[]>('colors', () => commonStore.getAllColors());
const { data: listCate } = useAsyncData<Category[]>('categories', () => commonStore.getAllCategories());

if (pageStates.isResetFilter) {
  resetFilter();
}
const title = ref("");
switch (route.params.category) {
  case "men":
    listGenderSelected.value.push("Nam");
    pageStates.isPageGender = true;
    title.value = "Giày Nam"
    break;
  case "women":
    listGenderSelected.value.push("Nữ");
    pageStates.isPageGender = true;
    title.value = "Giày Nữ"
    break;
  case "kids":
    listGenderSelected.value.push("Trẻ em");
    pageStates.isPageGender = true;
    title.value = "Giày Trẻ Em"
    break;
  case "flash-sale":
    isSale.value = true;
    pageStates.isPageSale = true;
    title.value = "Giảm Giá"
    break;
  case "search":
    title.value = "Tìm kiếm: "
    break;
  default:
    break;
}
getQueryRouter();

const { data: pageProduct, pending } = await useAsyncData<IPage<ProductBasic[]>>(
  `pageProduct`, 
  () => productStore.filterProduct(
    keyword.value,
    listCateSelected.value, listBrandSelected.value,
    listColorSelected.value, listGenderSelected.value, isSale.value,
    currentPage.value, pageSize.value,
    sortingSelected.value.sortingKey, sortingSelected.value.orderBy
  ), {
    watch: [
      listCateSelected, listBrandSelected,
      listColorSelected, listGenderSelected, isSale, 
      currentPage, pageSize, sortingSelected, keyword
    ],
    lazy: true,
  },
);

watch([listCateSelected, listBrandSelected, listColorSelected, listGenderSelected, isSale], () => {
  setQueryRouter()
})

watch(() => route.query.q, () => {
  getQueryRouter();
})

function getQueryRouter() {
  // resetFilter();
  if (Array.isArray(route.query.categories)) {
    listCateSelected.value = route.query.categories as string[]
  } else if (route.query.categories) {
    listCateSelected.value = [route.query.categories as string]
  }
  if (Array.isArray(route.query.brands)) {
    listBrandSelected.value = route.query.brands as string[]
  } else if (route.query.brands) {
    listBrandSelected.value = [route.query.brands as string]
  }
  if (Array.isArray(route.query.colors)) {
    listColorSelected.value = route.query.colors as string[]
  } else if (route.query.colors) {
    listColorSelected.value = [route.query.colors as string]
  }
  if (Array.isArray(route.query.genders)) {
    listGenderSelected.value = route.query.genders as string[]
  } else if (route.query.genders) {
    listGenderSelected.value = [route.query.genders as string]
  }
  if (route.query.sale) {
    isSale.value = route.query.sale === 'true';
  }
}
function setQueryRouter() {
  const queryParams:any = {}
  if (listCateSelected.value.length > 0) {
    queryParams.categories = listCateSelected.value
  }
  if (listColorSelected.value.length > 0) {
    queryParams.colors = listColorSelected.value
  }
  if (listBrandSelected.value.length > 0) {
    queryParams.brands = listBrandSelected.value
  }
  if (listGenderSelected.value.length > 0 && !pageStates.isPageGender) {
    queryParams.genders = listGenderSelected.value
  }
  if (isSale.value && !pageStates.isPageSale) {
    queryParams.sale = isSale.value;
  }
  if (keyword.value != "") {
    queryParams.q = keyword.value;
  }
  router.replace({ query: queryParams })
}

function resetFilter() {
  listCateSelected.value = [];
  listBrandSelected.value = [];
  listColorSelected.value = [];
  listGenderSelected.value = [];
  isSale.value = false;
}

</script>

<style scoped>
.cate-body {
  height: 0;
  overflow: hidden;
}
.cate-body.open {
  height: 100%;
}
.hide {
  display: none !important;
}
.filter-mobile {
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  z-index: 999;
}
.cate-item {
  @apply border-t border-gray-300 pb-2
}
.v-enter-active {
  transition: all 0.5s cubic-bezier(.4,0,.2,1);
}

.v-leave-active {
  transition: all 0.5s cubic-bezier(.4,0,.2,1);
}

.v-enter-from,
.v-leave-to {
  transform: translateX(100%);
}
.arrow-icon {
  position: relative;
  background-color: transparent;
  height: 16px;
  width: 16px;
  display:block;
  cursor: pointer;
}
.arrow-icon span {
  position: absolute;
  background-color: #111C27;
  top: 8px;
  width: 8px;
  height: 2px;
  display: block;
  border-radius: 8px;
  transition: all .5s cubic-bezier(.25,1.7,.35,.8);
  transform-origin: center center;
}
.arrow-icon .left {
  left: 1px;
  transform: rotate(35deg);
}
.arrow-icon .right {
  right: 1px;
  transform: rotate(-35deg);
}
.arrow-icon.open .left {
  transform: rotate(-35deg);
 }
.arrow-icon.open .right {
  transform: rotate(35deg);
}
.color-white {
  @apply border border-gray-300
}
.color-wrap::before {
  display: block;
  content: "";
  width: 14px;
  height: 14px;
  clip-path: polygon(10% 40%, 39% 68%, 90% 18%, 100% 28%, 39% 89%, 0% 50%);
  transform: scale(0);
  transform-origin: bottom left;
  transition: 120ms transform ease-in-out;
  background-color: #fff;
}
.color-wrap.color-white::before {
  background-color: #000;
}
.checkbox-color:checked + .color-wrap::before {
  transform: scale(1);
}
</style>