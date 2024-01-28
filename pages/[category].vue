<template>
  <div class="container mx-auto mt-6">
    <div class="banner h-[320px] rounded-3xl overflow-hidden">
      <img class="object-cover object-center h-full w-full" src="../assets/images/banner_men.png" alt="banner men fashion">
    </div>
    <div class="mt-5">
      <div class="flex justify-between pb-4">
        <h2 class="text-4xl font-semibold italic">Men's shoes</h2>
      </div>
      <div class="grid grid-cols-10 gap-4 mt-4">
        <div class="col-span-12 md:col-span-2 pr-4">
          <div class="cate-item border-t border-gray-300 pb-2">
            <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
              @click="isOpenCate = !isOpenCate"
            >
              <div class="text-base font-semibold">Loại sản phẩm</div>
              <div class="arrow-icon" :class="{open: isOpenCate}">
                <span class="left"></span>
                <span class="right"></span>
              </div>
            </div>
            <div :class="{open: isOpenCate}" class="cate-body">
              <label v-for="cate in listCate" :key="cate.id" class="checkbox mb-2 font-medium">
                <input type="checkbox" v-model="listCateSelected" :value="cate.slug">
                {{ cate.name }}
              </label>
            </div>
          </div>
          <div class="cate-item border-t border-gray-300 pb-2">
            <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
              @click="isOpenSale = !isOpenSale"
            >
              <div class="text-base font-semibold">Giảm giá</div>
              <div class="arrow-icon" :class="{open: isOpenSale}">
                <span class="left"></span>
                <span class="right"></span>
              </div>
            </div>
            <div :class="{open: isOpenSale}" class="cate-body">
              <label class="checkbox mb-2 font-medium">
                <input type="checkbox" v-model="isSale">Giảm giá
              </label>
            </div>
          </div>
          <div class="cate-item border-t border-gray-300 pb-2">
            <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
              @click="isOpenColor = !isOpenColor"
            >
              <div class="text-base font-semibold">Màu sắc</div>
              <div class="arrow-icon" :class="{open: isOpenColor}">
                <span class="left"></span>
                <span class="right"></span>
              </div>
            </div>
            <div :class="{open: isOpenColor}" class="cate-body grid grid-cols-3 gap-y-3">
              <label class="cursor-pointer flex flex-col items-center select-none" v-for="color in listColor" :key="color.id">
                <input type="checkbox" v-model="listColorSelected" :value="color.engName" class="hide checkbox-color">
                <div class="w-7 h-7 rounded-full mb-1 color-wrap grid place-content-center"
                  :class="color.engName == 'White' ? 'color-white' : ''"
                  :style="{backgroundColor: color.code}"></div>
                  <div class="text-xs font-medium text-center">{{ color.name }}</div>
              </label>
            </div>
          </div>
          <div class="cate-item border-t border-gray-300 pb-2">
            <div class="flex justify-between items-center cursor-pointer py-3 pr-2"
              @click="isOpenBrand = !isOpenBrand"
            >
              <div class="text-base font-semibold">Hãng</div>
              <div class="arrow-icon" :class="{open: isOpenBrand}">
                <span class="left"></span>
                <span class="right"></span>
              </div>
            </div>
            <div :class="{open: isOpenBrand}" class="cate-body">
              <label v-for="brand in listBrand" :key="brand.id" class="checkbox mb-2 font-medium">
                <input type="checkbox" v-model="listBrandSelected" :value="brand.name">
                {{ brand.name }}
              </label>
            </div>
          </div>
        </div>
        <div class="col-span-12 md:col-span-8">
          <div class="grid grid-cols-4 gap-4">
            <div>1</div>
            <div>2</div>
            <div>3</div>
            <div>4</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCommonStore } from '~/stores';
import { Brand, Color, IResponse } from '~/types';

const commonStore = useCommonStore();
const isOpenCate = ref(true);
const isOpenSale = ref(true);
const isOpenColor = ref(true);
const isOpenBrand = ref(true);

const listCateSelected = ref([]);
const isSale = ref(false);
const listColorSelected = ref([]);
const listBrandSelected = ref([]);

const listCate = [
  {
    id: 1,
    name: "Classic",
    slug: "classic"
  },
  {
    id: 2,
    name: "Thể thao",
    slug: "the-thao"
  },
  {
    id: 3,
    name: "Sneakers",
    slug: "sneakers"
  },
]

const { data: listBrand } = useAsyncData<Brand[]>('brands', () => commonStore.getAllBrands());
const { data: listColor } = useAsyncData<Color[]>('colors', () => commonStore.getAllColors());


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
  transform: rotate(-35deg);
}
.arrow-icon .right {
  right: 1px;
  transform: rotate(35deg);
}
.arrow-icon.open .left {
  transform: rotate(35deg);
 }
.arrow-icon.open .right {
  transform: rotate(-35deg);
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