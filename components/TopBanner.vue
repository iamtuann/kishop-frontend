<template>
  <carousel 
  :items-to-show="1" 
  :autoplay="6000" 
  :wrap-around="true"
  class="relative"
  >
    <slide v-for="(slide, i) in slides" :key="i">
      <div class="carousel__item">
        <NuxtLink :to="slide.path">
          <img class="carousel_img" :src="slide.img" alt="">
        </NuxtLink>
      </div>
    </slide>

    <template #addons>
      <navigation class="navigation"/>
      <pagination class="pagination" />
    </template>
  </carousel>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'
import banner1 from '~/assets/images/banner_1.jpg'
import banner2 from '~/assets/images/banner_2.jpg'
import banner3 from '~/assets/images/banner_3.jpg'
const slides = [
  {
    path: "#",
    img: banner1
  },
  {
    path: "#",
    img: banner2
  },
  {
    path: "#",
    img: banner3
  },
]
</script>

<style scoped>
.carousel__item {
  width: 100%;
}

.carousel_img {
  object-fit: cover;
  width: 100%;
  object-position: center;
  height: 500px;
}

.carousel__prev,
.carousel__next {
  box-sizing: content-box;
  border: 5px solid white;
}
.pagination {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 10px;
}
</style>
<style>
.pagination .carousel__pagination-button::after {
  width: 26px;
  background-color: rgba(235, 235, 235, 0.4);
}
.pagination .carousel__pagination-button--active::after {
  background-color: #fff;
}
.navigation .carousel__icon {
  fill: #fff;
}
.navigation .carousel__prev, .navigation  .carousel__next {
  width: 48px;
}
</style>