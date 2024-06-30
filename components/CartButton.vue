<template>
  <button class="btn-wrap btn-primary hover:bg-primary-600 transition-all duration-200"
    :class="{ 'is-adding': isAdding, 'is-added': isAdded && !isEnded }">
    <div class="add-animation">
      <span></span>
      <div v-if="isAdding" class="flex gap-x-1">
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
      </div>
      <div v-if="isAdded && !isEnded" class="success-animation">
        <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
          <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
          <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
        </svg>
      </div>
      <div class="cart-icon">
        <span class="material-symbols-outlined semibold-style-icon">
          shopping_cart
        </span>
      </div>
    </div>
    <span>Thêm vào giỏ</span>
  </button>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const props = defineProps({
  isAdding: { type: Boolean, required: true },
  isAdded: { type: Boolean, required: false },
})

const emits = defineEmits(['ended'])

const isEnded: Ref<boolean> = ref(false);
const delayEndAnimation: number = 1600;
const timeDelay = (delayEndAnimation - 400) / 1000 + 's';

watch(() => props.isAdded, (newVal) => {
  if (newVal === true) {
    setTimeout(() => {
      isEnded.value = true;
      emits('ended');
    }, delayEndAnimation);
  } else {
    isEnded.value = false;
  }
}) 

</script>

<style scoped>

.btn-wrap {
  position: relative;
  overflow-x: hidden;
}

.btn-wrap.is-adding {
  cursor: default;
}

.add-animation {
  position: absolute;
  color: #000;
  background-color: #fff;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  right: calc(100%);
  border-radius: inherit;
  transition: all ease-in-out .2s;
}

.btn-wrap:hover .add-animation {
  right: calc(100% - var(--cart-icon-width));
}

.btn-wrap.is-adding .add-animation {
  transition: all ease-in-out .4s;
  right: 0;
}

.btn-wrap.is-added .add-animation {
  right: 0;
  animation: added .4s ease-in-out v-bind(timeDelay) forwards;
}

.cart-icon {
  position: absolute;
  right: 0;
  height: 100%;
  width: var(--cart-icon-width);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: inherit;
}

.dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: wave 1s linear infinite;
  @apply bg-slate-800;
}

.dot:nth-child(2) {
  animation-delay: -0.8s;
}

.dot:nth-child(3) {
  animation-delay: -0.6s;
}

@keyframes wave {

  0%,
  60%,
  100% {
    transform: initial;
  }

  30% {
    transform: translateY(-8px);
  }
}

@keyframes adding {
  100% {
    right: 0;
  }
}

@keyframes added {
  50% {
    right: 10%;
  }

  100% {
    right: -100%;
  }
}

/* success animation */
.success-animation {
  margin: auto;
}

.checkmark {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: block;
  stroke-width: 2;
  stroke: #4bb71b;
  stroke-miterlimit: 10;
  box-shadow: inset 0px 0px 0px #4bb71b;
  animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
  position: relative;
}

.checkmark__circle {
  stroke-dasharray: 166;
  stroke-dashoffset: 166;
  stroke-width: 2;
  stroke-miterlimit: 10;
  stroke: #4bb71b;
  fill: #fff;
  animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;

}

.checkmark__check {
  transform-origin: 50% 50%;
  stroke-dasharray: 48;
  stroke-dashoffset: 48;
  animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
}

@keyframes stroke {
  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes scale {

  0%,
  100% {
    transform: none;
  }

  50% {
    transform: scale3d(1.1, 1.1, 1);
  }
}

@keyframes fill {
  100% {
    box-shadow: inset 0px 0px 0px 30px #4bb71b;
  }
}
</style>