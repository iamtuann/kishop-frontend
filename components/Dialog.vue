<template>
  <Transition :duration="200" name="nested" appear>
    <div v-if="modelValue" class="dialog">
      <div class="content" ref="content">
        <slot />
      </div>
      <div v-if="modelValue" class="overlay"></div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const emits = defineEmits(["update:modelValue"]);
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  persistent: { type: Boolean, default: false },
  width: { type: String, default: "auto" },
  maxWidth: { type: String },
  minWidth: { type: String },
})

const { modelValue } = toRefs(props);
const content = ref(null);

onClickOutside(content, () => {
  if (!props.persistent) {
    emits("update:modelValue", !modelValue.value)
  }
})

function handleBodyScrollClass(value: boolean) {
  modelValue.value ? document.body.classList.add('no-scroll') : document.body.classList.remove('no-scroll');
}
onMounted(() => {
  handleBodyScrollClass(modelValue.value);
})
watch(modelValue, (newVal) => {
  handleBodyScrollClass(newVal);
})
onBeforeUnmount(() => {
  document.body.classList.remove('no-scroll');
});
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.content {
  position: absolute;
  z-index: 2100;
  border-radius: 4px;
  background-color: transparent;
  margin: 24px;
  width: auto;
  width: v-bind(width);
  min-width: v-bind(minWidth);
  max-width: v-bind(maxWidth);
  box-shadow: 0 11px 15px -7px rgba(0, 0, 0, .2),0 24px 38px 3px rgba(0, 0, 0, .14),0 9px 46px 8px rgba(0, 0, 0, .12);
}
.overlay {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgb(0, 0, 0);
  opacity: 0.2;
  z-index: 2000;
  user-select: none;
}

.nested-enter-active .content,
.nested-leave-active .content {
  transition: all 0.2s ease-in-out;
}

.nested-enter-from .content,
.nested-leave-to .content {
  transform: scale(0.3);
  opacity: 0;
}
.nested-enter-active .overlay,
.nested-leave-active .overlay {
  transition: all 0.2s ease-in-out;
}
.nested-enter-from .overlay,
.nested-leave-to .overlay {
  opacity: 0;
}
</style>